import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { TOrder, TOrdersData } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface OrderSliceState {
  orderRequest: boolean;
  orderModalData: null | TOrder;
  orders: TOrder[];
  isOrderLoading: boolean;
  error: string | null;
  feed: TOrdersData | null;
}

const initialState: OrderSliceState = {
  orderRequest: false,
  orderModalData: null,
  orders: [],
  isOrderLoading: false,
  error: null,
  feed: null
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (orderData: string[]) => await orderBurgerApi(orderData)
);

export const getFeeds = createAsyncThunk(
  'feeds/getFeeds',
  async () => await getFeedsApi()
);

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderClose(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isOrderLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderRequest = false;
        state.feed = action.payload;
        state.orders = action.payload.orders;
      })
      .addCase(getOrders.pending, (state) => {
        state.isOrderLoading = true;
        state.orderRequest = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload;
      })
      .addCase(orderBurger.pending, (state) => {
        state.isOrderLoading = true;
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.orderRequest = false;
        state.error = action.error.message || null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message || null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderModalData = action.payload.orders[0];
      });
  }
});

export const { orderClose } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
