import { TConstructorIngredient } from '@utils-types';
import { createSlice, nanoid } from '@reduxjs/toolkit';

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
    addIngredients: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = { ...action.payload, id: nanoid() };
      } else {
        state.ingredients.push({
          ...action.payload,
          id: nanoid()
        });
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
