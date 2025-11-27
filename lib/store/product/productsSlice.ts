import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/lib/types/Product";

export interface ProductsState {
  items: ProductType[];
  filteredItems: ProductType[];
  limit: number;
  loadingInitial: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  searchTerm: string;
  selectedCategory: string;
  selectedPrice: string;
  selectedRating: string;
  ratingSort: "high-to-low" | "low-to-high" | null;
  categoryOptions: string[]; // ✅ dynamic category list
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  limit: 10,
  loadingInitial: false,
  loadingMore: false,
  hasMore: true,
  searchTerm: "",
  selectedCategory: "All",
  selectedPrice: "All",
  selectedRating: "All",
  ratingSort: null,
  categoryOptions: [], // default empty, filled from API later ✅
};

export const fetchProducts = createAsyncThunk<ProductType[], number>(
  "products/fetchProducts",
  async (limit: number) => {
    const res = await fetch(
      `https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=${limit}&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid%252Crating`
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

    setCategoryFilter(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
      productsSlice.caseReducers.applyFilters(state);
    },

    setPriceFilter(state, action: PayloadAction<string>) {
      state.selectedPrice = action.payload;
      productsSlice.caseReducers.applyFilters(state);
    },

    setRatingFilter(state, action: PayloadAction<string>) {
      state.selectedRating = action.payload;
      productsSlice.caseReducers.applyFilters(state);
    },

    setRatingSort(state, action: PayloadAction<"high-to-low" | "low-to-high" | null>) {
      state.ratingSort = action.payload;
      productsSlice.caseReducers.applyFilters(state);
    },

    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      productsSlice.caseReducers.applyFilters(state);
    },

    applyFilters(state) {
      let temp = [...state.items];

      // ✅ CATEGORY FILTER FIXED
      if (state.selectedCategory !== "All") {
        temp = temp.filter(
          (p) =>
            p.category?.toLowerCase() === state.selectedCategory.toLowerCase()
        );
      }

      // Price filter
      if (state.selectedPrice !== "All") {
        temp = temp.filter((p) => {
          const price = p.price;
          switch (state.selectedPrice) {
            case "$0 - $100":
              return price >= 0 && price <= 100;
            case "$101 - $500":
              return price >= 101 && price <= 500;
            case "$501 - $1000":
              return price >= 501 && price <= 1000;
            case "$1000+":
              return price > 1000;
            default:
              return true;
          }
        });
      }

      // Minimum rating filter
      if (state.selectedRating !== "All") {
        temp = temp.filter((p) => {
          const rating = p.rating;
          switch (state.selectedRating) {
            case "4 Stars & Up": return rating >= 4;
            case "3 Stars & Up": return rating >= 3;
            case "2 Stars & Up": return rating >= 2;
            case "1 Star & Up": return rating >= 1;
            default: return true;
          }
        });
      }

      // Search
      if (state.searchTerm.trim()) {
        const term = state.searchTerm.toLowerCase();
        temp = temp.filter((p) => p.title.toLowerCase().includes(term));
      }

      // ✅ Rating sorting
      if (state.ratingSort === "high-to-low") {
        temp = temp.sort((a, b) => b.rating - a.rating);
      } else if (state.ratingSort === "low-to-high") {
        temp = temp.sort((a, b) => a.rating - b.rating);
      }

      state.filteredItems = temp;
      state.hasMore = temp.length >= state.limit;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        if (state.items.length === 0) {
          state.loadingInitial = true;
        } else {
          state.loadingMore = true;
        }
      })

      // ✅ FULL LOGIC FIXED HERE
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingInitial = false;
        state.loadingMore = false;
        state.items = action.payload;

        // ✅ Extract real categories from random products API
        const realCategories = Array.from(
          new Set(action.payload.map((p) => p.category))
        );

        state.categoryOptions = realCategories; // ✅ stored for sidebar
        productsSlice.caseReducers.applyFilters(state);
      })

      .addCase(fetchProducts.rejected, (state) => {
        state.loadingInitial = false;
        state.loadingMore = false;
      });
  },
});

export const {
  increaseLimit,
  setSearchTerm,
  setCategoryFilter,
  setPriceFilter,
  setRatingFilter,
  setRatingSort, // ✅ correct export now
} = productsSlice.actions;

export default productsSlice.reducer;
