import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/lib/types/Product";

export interface ProductsState {
  items: ProductType[];
  limit: number;
  loading: boolean;
  hasMore: boolean;
}

const initialState: ProductsState = {
  items: [],
  limit: 10,
  loading: false,
  hasMore: true,
};

// Fetch products with limit
export const fetchProducts = createAsyncThunk<ProductType[], number>(
  "products/fetchProducts",
  async (limit: number) => {
    const res = await fetch(
      `https://api.freeapi.app/api/v1/public/randomproducts?limit=${limit}`
    );
    const json = await res.json();
    return json.data.data as ProductType[];
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    increaseLimit(state) {
      state.limit += 10;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.loading = false;
          state.items = action.payload;
          state.hasMore = action.payload.length >= state.limit;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { increaseLimit } = productsSlice.actions;
export default productsSlice.reducer;
