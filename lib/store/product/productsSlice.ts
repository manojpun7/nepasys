import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/lib/types/Product";

// --------------------
// STATE TYPE
// --------------------
export interface ProductsState {
  items: ProductType[];
  filteredItems: ProductType[];
  limit: number;
  loadingInitial: boolean; // true during first load
  loadingMore: boolean;    // true when loading additional items
  hasMore: boolean;
  searchTerm: string;
  selectedCategory: string;
}

// --------------------
// INITIAL STATE
// --------------------
const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  limit: 10,
  loadingInitial: false,
  loadingMore: false,
  hasMore: true,
  searchTerm: "",
  selectedCategory: "All",
};

// --------------------
// FETCH PRODUCTS THUNK
// --------------------
export const fetchProducts = createAsyncThunk<ProductType[], number>(
  "products/fetchProducts",
  async (limit: number) => {
    const res = await fetch(
      `https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=${limit}&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid`
    );
    const json = await res.json();
    return json.data.data as ProductType[];
  }
);

// --------------------
// REDUX SLICE
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
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        // If no items yet, this is initial load
        if (state.items.length === 0) {
          state.loadingInitial = true;
        } else {
          state.loadingMore = true;
        }
      })

      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.loadingInitial = false;
          state.loadingMore = false;

          state.items = action.payload;
          state.hasMore = action.payload.length >= state.limit;

          productsSlice.caseReducers.applyFilters(state);
        }
      )

      .addCase(fetchProducts.rejected, (state) => {
        state.loadingInitial = false;
        state.loadingMore = false;
      });
  },
});

// --------------------
// EXPORT ACTIONS
// --------------------
export const { increaseLimit, setSearchTerm, setCategoryFilter } =
  productsSlice.actions;

export default productsSlice.reducer;
