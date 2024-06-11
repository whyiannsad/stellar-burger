import {
  TConstructor,
  addIngredients,
  burgerConstructorReducer,
  clearIngredients,
  removeIngredients,
  initialState
} from './constructorSlice';

describe('Тест constructorSlice', () => {
  const bun = {
    id: '3',
    _id: '3',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 9,
    calories: 5,
    price: 220,
    image: 'example.png',
    image_mobile: 'example.png',
    image_large: 'example.png'
  };

  const main = {
    id: '0',
    _id: '0',
    name: 'Котлета',
    type: 'main',
    proteins: 12,
    fat: 27,
    carbohydrates: 21,
    calories: 22,
    price: 242,
    image: 'example.png',
    image_large: 'example.png',
    image_mobile: 'example.png'
  };

  it('Тест на добавление ингредиента', () => {
      const action = addIngredients(bun);
      const state = burgerConstructorReducer(initialState, action);
      expect(state.constructorItems.bun).toEqual({
        ...bun,
        id: action.payload.id
      });
  });

  test('Тест на удаление ингредиента', () => {
      const initialStateMock: TConstructor = {
        constructorItems: { bun: null, ingredients: [main] },
        isLoading: false,
        error: null
      };
      const state = burgerConstructorReducer(
        initialStateMock,
        removeIngredients(main)
      );
      expect(state.constructorItems.ingredients).toHaveLength(0);
      expect(state.constructorItems.ingredients[0]).toBeUndefined();
  });

  test('Тест на очистку конструктора', () => {
      const initialStateMock: TConstructor = {
        constructorItems: { bun: bun, ingredients: [bun] },
        isLoading: false,
        error: null
      };
      const state = burgerConstructorReducer(
        initialStateMock,
        clearIngredients()
      );
      expect(state.constructorItems).toEqual({ bun: null, ingredients: [] });
  });
});
