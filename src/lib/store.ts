import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () =>
  configureStore({
    reducer: {},
    devTools: process.env.NODE_ENV !== "production",
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
