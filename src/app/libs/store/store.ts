// app/libs/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/productsApi";
import cartReducer from "../features/cartSlice";
import { businessesApi } from "../features/buissinessApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
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
