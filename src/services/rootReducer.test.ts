import { store, rootReducer } from '../services/store';

describe('Тестирование rootReducer', () => {
  test('Проверка undefined', () => {
    const reducerTest = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(reducerTest).toEqual(store.getState());
  });
});
