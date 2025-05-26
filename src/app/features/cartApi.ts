// features/cartApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CartItem {
  productId: string;
  quantity: number;
  price:number;
  variantId?: string;
}

interface CartResponse {
  items: CartItem[];
  total: number;
}

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => 'cart',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation<CartResponse, CartItem>({
      query: (item) => ({
        url: 'cart',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCartItem: builder.mutation<CartResponse, CartItem>({
      query: ({ productId, quantity, variantId }) => ({
        url: `cart/${productId}`,
        method: 'PUT',
        body: { quantity, variantId },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation<CartResponse, string>({
      query: (productId) => ({
        url: `cart/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} = cartApi;