import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./product/productsSlice";
import categoriesReducer from '../store/product/category/categorySlice'
import cartReducer from '../../lib/cart/cartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
