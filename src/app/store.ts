import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import spiderReducer from "../features/spider/SpiderSlice";

export const store = configureStore({
  reducer: {
    spider: spiderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
