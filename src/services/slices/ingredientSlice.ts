import { TIngredient } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

interface TIngredients {
  ingredients: TIngredient[];
  isLoadingIngredient: boolean;
  error: string | null;
}

const initialState: TIngredients = {
  ingredients: [],
  isLoadingIngredient: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    isLoading: (state) => state.isLoadingIngredient,
    ingredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoadingIngredient = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoadingIngredient = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoadingIngredient = false;
        state.ingredients = action.payload;
      });
  }
});

export const { isLoading, ingredients } = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
