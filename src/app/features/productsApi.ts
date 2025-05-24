// src/features/api/productsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the type of a single product
interface Product {
  id: number;
  name: string;
  price: number;
  data: [];
}
interface ProductsResponse {
  data: Product[];
}
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}` }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => "/products",
   
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
