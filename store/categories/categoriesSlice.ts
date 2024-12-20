import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "@/config";
import { CategoriesState, Category } from "./types";
import { Meal } from "../meal/types";

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
  filteredData: [],
  filterLoading: false,
  filterError: null,
};

// Async thunk to get meal categories
export const getMealCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/getMealCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get("/categories.php");
    return response.data.categories;
  } catch (err: any) {
    const errorMessage = err.response?.status
      ? err.response.status
      : err.message;
    return rejectWithValue(errorMessage);
  }
});

// Async thunk to filter meals by category
export const filterByCategory = createAsyncThunk<
  Meal[],
  { category: string },
  { rejectValue: string }
>("categories/filterByCategory", async ({ category }, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get(`/filter.php?c=${category}`);
    return response.data.meals;
  } catch (err: any) {
    const errorMessage = err.response?.status
      ? err.response.status
      : err.message;
    return rejectWithValue(errorMessage);
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMealCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getMealCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getMealCategories.rejected,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload || "Unknown error";
        }
      )
      .addCase(filterByCategory.pending, (state) => {
        state.filterLoading = true;
        state.filterError = null;
      })
      .addCase(
        filterByCategory.fulfilled,
        (state, action: PayloadAction<Meal[]>) => {
          state.filteredData = action.payload;
          state.filterLoading = false;
          state.filterError = null;
        }
      )
      .addCase(
        filterByCategory.rejected,
        (state, action: PayloadAction<string>) => {
          state.filterLoading = false;
          state.filterError = action.payload || "Unknown error";
        }
      );
  },
});

export default categoriesSlice.reducer;
