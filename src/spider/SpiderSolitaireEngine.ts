import {
  compareRankByStack,
  generateDeck,
  StandardPlayingCard as Card,
  StandardPlayingCardSuit as Suit,
} from "../playing_cards/StandardPlayingCards";

const STOCK_SIZE = 5;
const FOUNDATION_SIZE = 8;
const TABLEAU_SIZE = 10;

export type TableauCardState = "revealed" | "hidden" | "known";
export type TableauCard = Card & { state: TableauCardState };
export type CompletedPileState = Suit | "none";
export type Tableau = Array<Array<TableauCard>>;
export type MoveTableauStack = {
  // The tableau pile to move the stack from
  fromPileIndex: number;
  // The tableau pile to move the stack to
  toPileIndex: number;
  // The index of the card in the from tableau pile to move
  pileStackIndex: number;
};

export interface PilesState {
  stock: Array<Array<Card>>;
  foundations: Array<CompletedPileState>;
  tableau: Tableau;
}

export function revealTableau(tableau: Tableau): void {
  for (const tableauStack of tableau) {
    const lastCard = tableauStack.at(-1);
    if (lastCard) {
      lastCard.state = "revealed";
    }
  }
}

export function createInitialPiles(
  suits: Array<Suit> = ["♠", "♥"]
): PilesState {
  let piles: PilesState = {
    stock: [],
    foundations: Array<CompletedPileState>(FOUNDATION_SIZE).fill("none"),
    tableau: Array<Array<TableauCard>>(TABLEAU_SIZE)
      .fill([])
      .map((_) => []),
  };

  const foundationSuits: Array<Suit> = [];
  let suitsIndex = 0;
  for (let i = 0; i < FOUNDATION_SIZE; i++) {
    foundationSuits[i] = suits[suitsIndex];
    suitsIndex = (suitsIndex + 1) % suits.length;
  }
  const deck = generateDeck(1, foundationSuits);

  // Fill the stock
  for (let i = 0; i < STOCK_SIZE; i++) {
    const stockPile: Array<Card> = [];
    for (let j = 0; j < TABLEAU_SIZE; j++) {
      const card = deck.pop();
      if (card) {
        stockPile.push(card);
      }
    }
    piles.stock.push(stockPile);
  }

  // Fill the tableau
  let tableauIndex = 0;
  while (deck.length > 0) {
    const card = deck.pop();
    if (card) {
      piles.tableau[tableauIndex].push({ ...card, state: "hidden" });
    }
    tableauIndex = (tableauIndex + 1) % piles.tableau.length;
  }

  revealTableau(piles.tableau);

  return piles;
}

export function canMoveStack(
  move: MoveTableauStack,
  tableau: Tableau
): boolean {
  const movedStack = tableau[move.fromPileIndex].slice(move.pileStackIndex);
  const bottomCardInStack = movedStack.at(0);
  const topCardInToPile = tableau[move.toPileIndex].at(-1);

  // Empty stack
  if (!bottomCardInStack) {
    return false;
  }
  // Check all cards in the stack have the same suit and are revealed
  if (
    !movedStack.every(
      (card) =>
        card.suit === bottomCardInStack.suit && card.state === "revealed"
    )
  ) {
    return false;
  }
  // Check if the pile to move to is empty
  if (!topCardInToPile) {
    return true;
  }
  return compareRankByStack(bottomCardInStack, topCardInToPile) < 0;
}

export function moveStack(move: MoveTableauStack, tableau: Tableau): void {
  const movedStack = tableau[move.fromPileIndex].splice(move.pileStackIndex);
  tableau[move.toPileIndex].push(...movedStack);
}
