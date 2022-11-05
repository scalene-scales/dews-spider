import { canMoveStack, moveStack, Tableau } from "./SpiderSolitaireEngine";

describe("spider solitaire engine", () => {
  it("should allow moving to an empty pile", () => {
    const tableau: Tableau = [
      [{ rank: "2", suit: "♠", state: "revealed" }],
      [],
    ];
    expect(
      canMoveStack(
        { toPileIndex: 1, fromPileIndex: 0, pileStackIndex: 0 },
        tableau
      )
    ).toEqual(true);
  });

  it("should not allow moving to a pile with a smaller rank", () => {
    const tableau: Tableau = [
      [{ rank: "2", suit: "♠", state: "revealed" }],
      [{ rank: "A", suit: "♠", state: "revealed" }],
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
      [
        { rank: "2", suit: "♠", state: "revealed" },
        { rank: "A", suit: "♠", state: "revealed" },
      ],
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
      [
        { rank: "2", suit: "♠", state: "revealed" },
        { rank: "A", suit: "♥", state: "revealed" },
      ],
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
    const tableau: Tableau = [
      [{ rank: "2", suit: "♠", state: "revealed" }],
      [],
    ];
    moveStack({ toPileIndex: 1, fromPileIndex: 0, pileStackIndex: 0 }, tableau);
    expect(tableau).toEqual([
      [],
      [{ rank: "2", suit: "♠", state: "revealed" }],
    ]);
  });

  it("should move to non-empty pile", () => {
    const tableau: Tableau = [
      [{ rank: "A", suit: "♠", state: "revealed" }],
      [{ rank: "2", suit: "♠", state: "revealed" }],
    ];
    moveStack({ toPileIndex: 1, fromPileIndex: 0, pileStackIndex: 0 }, tableau);
    expect(tableau).toEqual([
      [],
      [
        { rank: "2", suit: "♠", state: "revealed" },
        { rank: "A", suit: "♠", state: "revealed" },
      ],
    ]);
  });

  it("should move multiple cards", () => {
    const tableau: Tableau = [
      [
        { rank: "2", suit: "♠", state: "revealed" },
        { rank: "A", suit: "♠", state: "revealed" },
      ],
      [],
    ];
    moveStack({ toPileIndex: 1, fromPileIndex: 0, pileStackIndex: 0 }, tableau);
    expect(tableau).toEqual([
      [],
      [
        { rank: "2", suit: "♠", state: "revealed" },
        { rank: "A", suit: "♠", state: "revealed" },
      ],
    ]);
  });
});
