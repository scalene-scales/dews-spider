import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PilesState,
  createInitialPiles,
  TableauStackMove,
  moveStack as moveSpiderStack,
  HistoricSpiderSolitaireMove,
  undoMove as undoSpiderMove,
  dealStockMove,
  redoMove as redoSpiderMove,
  completeFoundationMove,
} from "./engine/SpiderSolitaireEngine";

type SpiderSolitaireState = {
  piles: PilesState;
  past: Array<HistoricSpiderSolitaireMove>;
  present: HistoricSpiderSolitaireMove;
  future: Array<HistoricSpiderSolitaireMove>;
};

const initialState: SpiderSolitaireState = {
  piles: createInitialPiles(),
  past: [],
  present: { type: "deal_stock" },
  future: [],
};

export const spiderSlice = createSlice({
  name: "spider",
  initialState,
  reducers: {
    restart: {
      reducer: (state, action: PayloadAction<PilesState>) => {
        state.piles = action.payload;
        state.past = [];
        state.present = { type: "deal_stock" };
        state.future = [];
      },
      prepare: () => {
        // Need to prepare because random shuffling.
        // TODO: Make this seedable.
        return { payload: createInitialPiles() };
      },
    },
    dealStock: (state) => {
      const historicMove = dealStockMove(state.piles);
      if (historicMove) {
        state.past.push(state.present);
        state.present = historicMove;
      }
    },
    moveStack: (state, action: PayloadAction<TableauStackMove>) => {
      const historicMove = moveSpiderStack(action.payload, state.piles.tableau);
      if (historicMove) {
        state.past.push(state.present);
        state.present = historicMove;
      }
    },
    completeFoundation: (state) => {
      const historicMove = completeFoundationMove(state.piles);
      if (historicMove) {
        state.past.push(state.present);
        state.present = historicMove;
      }
    },
    undoMove: (state) => {
      const lastLastMove = state.past.pop();
      if (!lastLastMove) {
        // Nothing to undo.
        return;
      }

      const lastMove = state.present;
      undoSpiderMove(lastMove, state.piles);

      state.present = lastLastMove;
      state.future.push(lastMove);
    },
    redoMove: (state) => {
      const nextMove = state.future.pop();
      if (!nextMove) {
        // Nothing to redo.
        return;
      }

      redoSpiderMove(nextMove, state.piles);

      state.past.push(state.present);
      state.present = nextMove;
    },
  },
});

export const {
  restart,
  dealStock,
  moveStack,
  completeFoundation,
  undoMove,
  redoMove,
} = spiderSlice.actions;

export default spiderSlice.reducer;
