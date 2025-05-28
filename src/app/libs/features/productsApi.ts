// src/features/api/productsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}` }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    getProductsByCategories: builder.query({
      query: (categoryId: string) => `/products?category=${categoryId}`,
    }),
    getProductById: builder.query({
      query: (productId: string) => `/products?_id=${productId}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoriesQuery,
  useGetProductByIdQuery,
} = productsApi;
