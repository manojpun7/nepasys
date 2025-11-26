import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Load cart from localStorage
    loadCart(state, action: PayloadAction<CartItem[]>) {
      state.cart = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },

    // Add product to cart
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existing = state.cart.find(item => item.id === action.payload.id);

      if (existing) {
        existing.quantity += 1; // increment quantity
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      cartSlice.caseReducers.calculateTotals(state);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // Remove one quantity of the product from cart
    removeFromCart(state, action: PayloadAction<number>) {
      const item = state.cart.find(i => i.id === action.payload);

      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(i => i.id !== action.payload);
        }
      }

      cartSlice.caseReducers.calculateTotals(state);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // Completely remove product from cart
    removeItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter(i => i.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // Clear entire cart
    clearCart(state) {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },

    // Calculate totals
    calculateTotals(state) {
      state.totalQuantity = state.cart.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
  },
});

export const { loadCart, addToCart, removeFromCart, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
