import { TConstructorIngredient } from '@utils-types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface TConstructor {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error: string | null;
}

export const initialState: TConstructor = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

export const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredients: (state, action) => {
      if (action.payload.type !== 'bun') {
        state.constructorItems.ingredients =
          state.constructorItems.ingredients.filter(
            (ingredients) => ingredients._id !== action.payload._id
          );
      }
    },
    clearIngredients: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  }
});

export const { addIngredients, removeIngredients, clearIngredients } =
  burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
