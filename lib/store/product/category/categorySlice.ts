import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Adjust this to your real endpoint:
const CATEGORY_API_URL = "https://fakestoreapi.com/products/categories";

export interface CategoryState {
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// -------------------------
// FETCH CATEGORIES THUNK
// -------------------------
export const fetchCategories = createAsyncThunk<string[]>(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(CATEGORY_API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = (await response.json()) as string[];

    return data; // MUST RETURN STRING ARRAY
  }
);

// -------------------------
// SLICE
// -------------------------
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.loading = false;
          state.categories = action.payload; // IMPORTANT
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching categories";
      });
  },
});

export default categorySlice.reducer;
