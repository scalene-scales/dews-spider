import {
  compareRankByStack,
  generateDeck,
  StandardPlayingCard as Card,
  StandardPlayingCardSuit as Suit,
  STANDARD_PLAYING_CARD_RANKS,
} from "../../playing_cards/StandardPlayingCards";

const STOCK_SIZE = 5;
const FOUNDATION_SIZE = 8;
const TABLEAU_SIZE = 10;

export type TableauCardState = "revealed" | "hidden" | "known";
export type TableauCard = Card & { state: TableauCardState };
export type CompletedPileState = Suit | "none";
export type Tableau = Array<Array<TableauCard>>;
export type TableauStackMove = {
  // The tableau pile to move the stack from
  fromPileIndex: number;
  // The tableau pile to move the stack to
  toPileIndex: number;
  // The index of the card in the from tableau pile to move
  pileStackIndex: number;
};

export type HistoricDealStockMove = { type: "deal_stock" };
export type HistoricCompleteFoundationMove = {
  type: "complete_foundation";
  tableauPileIndex: number;
};
export type HistoricTableauStackMove = TableauStackMove & {
  type: "move_tableau_stack";
  stackSize: number;
  revealedCard: boolean;
};

export type HistoricSpiderSolitaireMove =
  | HistoricTableauStackMove
  | HistoricDealStockMove
  | HistoricCompleteFoundationMove;

export interface PilesState {
  stock: Array<Array<Card>>;
  foundations: Array<CompletedPileState>;
  tableau: Tableau;
}

function revealTableau(tableau: Tableau): void {
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

export function dealStockMove(piles: PilesState): HistoricDealStockMove | null {
  if (piles.stock.length < 1) {
    // No stock, so cannot deal.
    return null;
  }

  const dealtCards = piles.stock.pop();
  dealtCards?.forEach((dealtCard, index) => {
    piles.tableau[index].push({ ...dealtCard, state: "revealed" });
  });
  return { type: "deal_stock" };
}

export function canMoveStack(
  move: TableauStackMove,
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

export function moveStack(
  move: TableauStackMove,
  tableau: Tableau
): HistoricTableauStackMove | null {
  if (!canMoveStack(move, tableau)) {
    return null;
  }

  const movedStack = tableau[move.fromPileIndex].splice(move.pileStackIndex);
  tableau[move.toPileIndex].push(...movedStack);

  const topFromPileCard = tableau[move.fromPileIndex].at(-1);
  const historicMove: HistoricTableauStackMove = {
    type: "move_tableau_stack",
    stackSize: movedStack.length,
    revealedCard: topFromPileCard ? topFromPileCard.state === "hidden" : false,
    ...move,
  };

  if (topFromPileCard) {
    topFromPileCard.state = "revealed";
  }

  return historicMove;
}

function nextCompletableFoundation(
  piles: PilesState
): HistoricCompleteFoundationMove | null {
  nextTableauPile: for (let i = 0; i < piles.tableau.length; i++) {
    const tableauPile = piles.tableau[i];
    if (tableauPile.length < STANDARD_PLAYING_CARD_RANKS.length) {
      continue;
    }
    const suit = tableauPile.at(-1)?.suit;
    if (suit == null) {
      continue;
    }
    for (let j = 0; j < STANDARD_PLAYING_CARD_RANKS.length; j++) {
      const tableauCard = tableauPile[tableauPile.length - j - 1];
      if (tableauCard.suit !== suit) {
        continue nextTableauPile;
      }
      if (tableauCard.rank !== STANDARD_PLAYING_CARD_RANKS[j]) {
        continue nextTableauPile;
      }
    }
    return { type: "complete_foundation", tableauPileIndex: i };
  }
  return null;
}

export function canCompleteFoundation(piles: PilesState): boolean {
  return nextCompletableFoundation(piles) == null;
}

export function completeFoundationMove(
  piles: PilesState
): HistoricCompleteFoundationMove | null {
  const move = nextCompletableFoundation(piles);
  if (!move) {
    return null;
  }
  const topTableauCard = piles.tableau[move.tableauPileIndex].at(-1);
  if (!topTableauCard) {
    return null;
  }
  STANDARD_PLAYING_CARD_RANKS.forEach((_) =>
    piles.tableau[move.tableauPileIndex].pop()
  );
  piles.foundations.push(topTableauCard.suit);
  return move;
}

function undoTableauStackMove(
  move: HistoricTableauStackMove,
  tableau: Tableau
): void {
  const pileIndex = tableau[move.toPileIndex].length - move.stackSize;

  const undoMove = {
    toPileIndex: move.fromPileIndex,
    fromPileIndex: move.toPileIndex,
    pileStackIndex: pileIndex,
  };

  if (move.revealedCard) {
    const revealedCard = tableau[move.fromPileIndex].at(-1);
    if (revealedCard) {
      revealedCard.state = "known";
    }
  }
  moveStack(undoMove, tableau);
}

function undoDealStockMove(_: HistoricDealStockMove, piles: PilesState) {
  const stockPile: Array<Card> = [];
  piles.tableau.forEach((tableauPile) => {
    const topTableauCard = tableauPile.pop();
    if (topTableauCard) {
      stockPile.push(topTableauCard);
    }
  });

  piles.stock.push(stockPile);
}

export function undoMove(move: HistoricSpiderSolitaireMove, piles: PilesState) {
  switch (move.type) {
    case "deal_stock":
      undoDealStockMove(move, piles);
      break;
    case "move_tableau_stack":
      undoTableauStackMove(move, piles.tableau);
      break;
    case "complete_foundation":
      const lastCompletedFoundation = piles.foundations.at(-1);
      if (lastCompletedFoundation) {
        if (lastCompletedFoundation !== "none") {
          const newStack: Array<TableauCard> = generateDeck(
            1,
            [lastCompletedFoundation],
            false
          )
            .reverse()
            .map((card) => {
              return { ...card, state: "revealed" };
            });
          piles.tableau[move.tableauPileIndex].push(...newStack);
        }
      }

      break;
  }
}

export function redoMove(move: HistoricSpiderSolitaireMove, piles: PilesState) {
  switch (move.type) {
    case "deal_stock":
      dealStockMove(piles);
      break;
    case "move_tableau_stack":
      moveStack(move, piles.tableau);
      break;
    case "complete_foundation":
      completeFoundationMove(piles);
      break;
  }
}
