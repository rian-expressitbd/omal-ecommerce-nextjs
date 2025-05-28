// src/app/libs/features/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

const initialState: CartState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems") || "[]")
      : [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.variantId === action.payload.variantId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    updateCartItem(
      state,
      action: PayloadAction<{
        productId: string;
        variantId: string | null;
        quantity: number;
      }>
    ) {
      const { productId, variantId, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.productId === productId && i.variantId === variantId
      );
      if (item) {
        item.quantity = quantity;
        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify(state.items));
        }
      }
    },
    removeFromCart(
      state,
      action: PayloadAction<{ productId: string; variantId: string | null }>
    ) {
      state.items = state.items.filter(
        (i) =>
          i.productId !== action.payload.productId ||
          i.variantId !== action.payload.variantId
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    toggleCart(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
    clearCart(state) {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("cartItems");
      }
    },
  },
});

export const { addToCart, updateCartItem, removeFromCart, toggleCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;