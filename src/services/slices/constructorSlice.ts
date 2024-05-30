import { TConstructorIngredient } from '@utils-types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface TConstructor {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: TConstructor = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredients: (state, action) => {
      if (action.payload.type !== 'bun') {
        state.ingredients = state.ingredients.filter(
          (ingredients) => ingredients.id !== action.payload
        );
      }
    },
    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { addIngredients, removeIngredients, clearIngredients } =
  burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
