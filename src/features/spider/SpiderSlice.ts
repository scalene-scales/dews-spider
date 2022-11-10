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
  tryCompleteFoundationMove,
} from "./engine/SpiderSolitaireEngine";

type SpiderSolitaireState = {
  piles: PilesState;
  past: Array<HistoricSpiderSolitaireMove>;
  present: HistoricSpiderSolitaireMove;
  future: Array<HistoricSpiderSolitaireMove>;
};

const initialState: SpiderSolitaireState = {
  piles: createInitialPiles({}),
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
        return { payload: createInitialPiles({}) };
      },
    },
    dealStock: (state) => {
      const historicMove = dealStockMove(state.piles);
      if (historicMove) {
        state.past.push(state.present);
        state.present = historicMove;
      }

      const completionMove = tryCompleteFoundationMove(state.piles);
      if (completionMove) {
        state.past.push(state.present);
        state.present = completionMove;
      }
    },
    moveStack: (state, action: PayloadAction<TableauStackMove>) => {
      const historicMove = moveSpiderStack(action.payload, state.piles.tableau);
      if (historicMove) {
        state.past.push(state.present);
        state.present = historicMove;
      }

      const completionMove = tryCompleteFoundationMove(state.piles);
      if (completionMove) {
        state.past.push(state.present);
        state.present = completionMove;
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

export const { restart, dealStock, moveStack, undoMove, redoMove } =
  spiderSlice.actions;

export default spiderSlice.reducer;
