import {
  StandardPlayingCard,
  StandardPlayingCardRank,
  StandardPlayingCardSuit,
} from "../../playing_cards/StandardPlayingCards";
import {
  TableauCardState,
  TableauCard,
  Tableau,
  canMoveStack,
  moveStack,
} from "./SpiderSolitaireEngine";

function card(
  rank: StandardPlayingCardRank,
  suit: StandardPlayingCardSuit
): StandardPlayingCard {
  return {
    rank,
    suit,
  };
}

function t(card: StandardPlayingCard, state: TableauCardState): TableauCard {
  return {
    ...card,
    state,
  };
}

describe("spider solitaire engine", () => {
  it("should allow moving to an empty pile", () => {
    const tableau: Tableau = [[t(card("2", "♠"), "revealed")], []];
    expect(
      canMoveStack(
        { toPileIndex: 1, fromPileIndex: 0, pileStackIndex: 0 },
        tableau
      )
    ).toEqual(true);
  });

  it("should not allow moving to a pile with a smaller rank", () => {
    const tableau: Tableau = [
      [t(card("2", "♠"), "revealed")],
      [t(card("A", "♠"), "revealed")],
    ];
    expect(
      canMoveStack(
        { toPileIndex: 1, fromPileIndex: 0, pileStackIndex: 0 },
        tableau
      )
    ).toEqual(false);
  });

  it("should allow moving multiple cards of the same suit", () => {
    const tableau: Tableau = [
      [t(card("2", "♠"), "revealed"), t(card("A", "♠"), "revealed")],
      [],
    ];
    expect(
      canMoveStack(
        { toPileIndex: 1, fromPileIndex: 0, pileStackIndex: 0 },
        tableau
      )
    ).toEqual(true);
  });

  it("should not allow moving multiple cards of different suits", () => {
    const tableau: Tableau = [
      [t(card("2", "♠"), "revealed"), t(card("A", "♥"), "revealed")],
      [],
    ];
    expect(
      canMoveStack(
        { toPileIndex: 1, fromPileIndex: 0, pileStackIndex: 0 },
        tableau
      )
    ).toEqual(false);
  });

  it("should move to an empty pile", () => {
    const tableau: Tableau = [[t(card("2", "♠"), "revealed")], []];
    moveStack({ toPileIndex: 1, fromPileIndex: 0, pileStackIndex: 0 }, tableau);
    expect(tableau).toEqual([[], [t(card("2", "♠"), "revealed")]]);
  });

  it("should move to non-empty pile", () => {
    const tableau: Tableau = [
      [t(card("A", "♠"), "revealed")],
      [t(card("2", "♠"), "revealed")],
    ];
    moveStack({ toPileIndex: 1, fromPileIndex: 0, pileStackIndex: 0 }, tableau);
    expect(tableau).toEqual([
      [],
      [t(card("2", "♠"), "revealed"), t(card("A", "♠"), "revealed")],
    ]);
  });

  it("should move multiple cards", () => {
    const tableau: Tableau = [
      [t(card("2", "♠"), "revealed"), t(card("A", "♠"), "revealed")],
      [],
    ];
    moveStack({ toPileIndex: 1, fromPileIndex: 0, pileStackIndex: 0 }, tableau);
    expect(tableau).toEqual([
      [],
      [t(card("2", "♠"), "revealed"), t(card("A", "♠"), "revealed")],
    ]);
  });
});
