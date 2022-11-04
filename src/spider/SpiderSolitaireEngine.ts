import {
  generateDeck,
  StandardPlayingCard as Card,
  StandardPlayingCardSuit as Suit,
} from "../playing_cards/StandardPlayingCards";

type TableauCardState = "revealed" | "hidden" | "known";
type TableauCard = Card & { state: TableauCardState };
type CompletedPileState = Suit | "none";

const STOCK_SIZE = 5;
const FOUNDATION_SIZE = 8;
const TABLEAU_SIZE = 10;

export interface PilesState {
  stock: Array<Array<Card>>;
  foundations: Array<CompletedPileState>;
  tableau: Array<Array<TableauCard>>;
}

export function revealTableau(piles: PilesState): void {
  for (const tableauStack of piles.tableau) {
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

  revealTableau(piles);

  return piles;
}
