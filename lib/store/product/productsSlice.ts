import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/lib/types/Product";

// --------------------
// STATE TYPE ✅
// --------------------
export interface ProductsState {
  items: ProductType[];
  filteredItems: ProductType[];
  limit: number;
  loading: boolean;
  hasMore: boolean;
  searchTerm: string;
  selectedCategory: string;
}

// --------------------
// INITIAL STATE ✅
// --------------------
const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  limit: 10,
  loading: false,
  hasMore: true,
  searchTerm: "",
  selectedCategory: "All",
};

// --------------------
// FETCH PRODUCTS THUNK ✅
// includes category field
// --------------------
export const fetchProducts = createAsyncThunk<ProductType[], number>(
  "products/fetchProducts",
  async (limit: number) => {
    const res = await fetch(
      `https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=${limit}&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid`
    );

    const json = await res.json();
    // ✅ Correct nested data access
    return json.data.data as ProductType[];
  }
);

// --------------------
// REDUX SLICE ✅
// --------------------
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    increaseLimit(state) {
      state.limit += 10;
    },

    setCategoryFilter(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
      productsSlice.caseReducers.applyFilters(state);
    },

    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      productsSlice.caseReducers.applyFilters(state);
    },

    // --------------------
    // COMBINED FILTERS ✅ (Not exported)
    // Works on state.items
    // --------------------
    applyFilters(state) {
      let temp = state.items;

      if (state.selectedCategory !== "All") {
        temp = temp.filter((p) => p.category === state.selectedCategory);
      }

      if (state.searchTerm.trim()) {
        const term = state.searchTerm.toLowerCase();
        temp = temp.filter((p) => p.title.toLowerCase().includes(term));
      }

      state.filteredItems = temp;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
        state.loading = false;
        // ✅ Store full items list
        state.items = action.payload;
        state.hasMore = action.payload.length >= state.limit;

        // ✅ Apply filters after data load
        productsSlice.caseReducers.applyFilters(state);
      })

      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  }
});

// --------------------
// EXPORT ACTIONS ✅
// --------------------
export const {
  increaseLimit,
  setSearchTerm,
  setCategoryFilter
} = productsSlice.actions;

export default productsSlice.reducer;
