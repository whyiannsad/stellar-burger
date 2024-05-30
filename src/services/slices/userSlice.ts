import { TUser } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  TRegisterData,
  loginUserApi,
  TLoginData,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { deleteCookie, setCookie, getCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const userData = await loginUserApi({ email, password });
    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    return userData;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updateData: Partial<TRegisterData>) => await updateUserApi(updateData)
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (userData: { email: string }) => await forgotPasswordApi(userData)
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (userData: { password: string; token: string }) =>
    await resetPasswordApi(userData)
);

export const checkUser = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => {
          dispatch(setUser(res.user));
        })
        .catch(() => {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

type UserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | undefined;
};

const initialState: UserState = {
  isAuthChecked: false,
  user: null,
  error: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = undefined;
        state.user = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = undefined;
        state.user = action.payload.user;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = undefined;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = undefined;
        state.user = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const userReducer = userSlice.reducer;
export const { setAuthChecked, setUser } = userSlice.actions;
