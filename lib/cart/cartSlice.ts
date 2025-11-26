import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity: number;
}

interface CartState {
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
    loadCart(state, action: PayloadAction<CartItem[]>) {
      state.cart = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },

    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      cartSlice.caseReducers.calculateTotals(state);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart(state, action: PayloadAction<number>) {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter((i) => i.id !== action.payload);
        }
      }
      cartSlice.caseReducers.calculateTotals(state);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    clearCart(state) {
      state.cart = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
      localStorage.removeItem("cart");
    },

    calculateTotals(state) {
      state.totalQuantity = state.cart.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
  },
});

export const { loadCart, addToCart, removeFromCart, clearCart, clearCart:reset } = cartSlice.actions;
export default cartSlice.reducer;
