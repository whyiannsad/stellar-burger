import {
  getIngredients,
  ingredientsSlice,
  initialState
} from './ingredientSlice';

describe('Тест ingredientSlice', () => {
  const ingredients = {
    getIngredients: {
      pending: { type: getIngredients.pending.type },
      rejected: {
        type: getIngredients.rejected.type,
        error: { message: 'error message' }
      },
      fulfilled: {
        type: getIngredients.fulfilled.type,
        payload: ['first', 'second']
      }
    }
  };
  test('Тест pending', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('pending')
    );
    expect(state.isLoadingIngredient).toBe(true);
    expect(state.error).toBe(null);
  });
  test('Тест rejected', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      ingredients.getIngredients.rejected
    );
    expect(state.isLoadingIngredient).toBe(false);
    expect(state.error).toBe(ingredients.getIngredients.rejected.error.message);
  });
  test('Тест fulfilled', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      ingredients.getIngredients.fulfilled
    );
    expect(state.isLoadingIngredient).toBe(false);
    expect(state.ingredients).toEqual(
      ingredients.getIngredients.fulfilled.payload
    );
  });
});
