import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/productsApi";
import { businessesApi } from "../features/buissinessApi";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [businessesApi.reducerPath]: businessesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      businessesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
