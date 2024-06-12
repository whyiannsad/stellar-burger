import {
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  setAuthChecked,
  setUser,
  updateUser,
  userSlice
} from './userSlice';

describe('Тестирование userSlice', () => {
  describe('Тест регистрации', () => {
    const register = {
      registerUser: {
        pending: { type: registerUser.pending.type },
        rejected: {
          type: registerUser.rejected.type,
          error: { message: 'error message' }
        },
        fulfilled: {
          type: registerUser.fulfilled.type,
          payload: { user: { name: 'nickname', email: 'mail' } }
        }
      }
    };
    test('Тест pending', () => {
      expect(userSlice.reducer(initialState, register.registerUser.pending).isAuthChecked).toBe(true);
    });
    test('Тест reject', () => {
      const state = userSlice.reducer(
        initialState,
        register.registerUser.rejected
      );
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe(register.registerUser.rejected.error.message);
    });
    test('Тест fullfilld', () => {
      const state = userSlice.reducer(
        initialState,
        register.registerUser.fulfilled
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBe(register.registerUser.fulfilled.payload.user);
    });
  });
  describe('Тест авторизации', () => {
    const login = {
      loginUser: {
        pending: { type: loginUser.pending.type },
        rejected: {
          type: loginUser.rejected.type,
          error: { message: 'error message' }
        },
        fulfilled: {
          type: loginUser.fulfilled.type,
          payload: { user: { name: 'nickname', email: 'mail' } }
        }
      }
    };
    test('Тест pending', () => {
      expect(userSlice.reducer(initialState, login.loginUser.pending).isAuthChecked).toBe(true);
    });
    test('Тест rejected', () => {
      const state = userSlice.reducer(initialState, login.loginUser.rejected);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe(login.loginUser.rejected.error.message);
    });
    test('Тест fulfilled', () => {
      const state = userSlice.reducer(initialState, login.loginUser.fulfilled);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBe(login.loginUser.fulfilled.payload.user);
    });
  });
  describe('Тест logoutUser', () => {
    const logout = {
      logoutUser: {
        pending: { type: logoutUser.pending.type },
        rejected: {
          type: logoutUser.rejected.type,
          error: { message: 'error message' }
        },
        fulfilled: {
          type: logoutUser.fulfilled.type,
          payload: null
        }
      }
    };
    test('Тест ожидания', () => {
      expect(userSlice.reducer(initialState, logout.logoutUser.pending).error).toBe(undefined);
    });
    test('Тест rejected', () => {
      expect(userSlice.reducer(initialState, logout.logoutUser.rejected).error).toBe(logout.logoutUser.rejected.error.message);
    });
    test('Тест fulfilled', () => {
      expect(userSlice.reducer(initialState, logout.logoutUser.fulfilled).user).toBe(logout.logoutUser.fulfilled.payload);
    });
  });
  describe('Тест updateUser', () => {
    const update = {
      updateUser: {
        rejected: {
          type: updateUser.rejected.type,
          error: { message: 'error message' }
        },
        fulfilled: {
          type: updateUser.fulfilled.type,
          payload: { user: { name: 'nickname', email: 'mail' } }
        }
      }
    };
    test('Тест rejected', () => {
      expect(userSlice.reducer(initialState, update.updateUser.rejected).error).toBe(update.updateUser.rejected.error.message);
    });
    test('Тест fulfilled', () => {
      expect(userSlice.reducer(initialState, update.updateUser.fulfilled).user).toBe(update.updateUser.fulfilled.payload.user);
    });
  });
  describe('Тест setUser', () => {
    test('Тест на обновление', () => {
      const user = { name: 'nickname', email: 'mail' };
      expect(userSlice.reducer(initialState, setUser(user)).user).toBe(user);
    });
  });
  describe('Тест setIsAuthChecked', () => {
    test('Тест на установку значений', () => {
      expect(userSlice.reducer(initialState, setAuthChecked(true)).isAuthChecked).toBe(true);
    });
  });
});
