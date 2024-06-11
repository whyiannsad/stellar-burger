import {
  getFeeds,
  orderSlice,
  initialState,
  getOrders,
  getOrderByNumber,
  orderBurger
} from './orderSlice';

describe('Тест orderSlice', () => {
  describe('Тест getFeeds', () => {
    const feeds = {
      getFeeds: {
        rejected: {
          type: getFeeds.rejected.type,
          error: { message: 'error message' }
        },
        fulfilled: {
          type: getFeeds.fulfilled.type,
          payload: { orders: ['first', 'second'] }
        }
      }
    };
    test('Тест pending', () => {
      const state = orderSlice.reducer(
        initialState,
        getFeeds.pending('pending')
      );
      expect(state.isOrderLoading).toBe(true);
      expect(state.error).toBe(null);
    });
    test('Тест rejected', () => {
      const state = orderSlice.reducer(initialState, feeds.getFeeds.rejected);
      expect(state.isOrderLoading).toBe(false);
      expect(state.error).toBe(feeds.getFeeds.rejected.error.message);
    });
    test('Тест fulfilled', () => {
      const state = orderSlice.reducer(initialState, feeds.getFeeds.fulfilled);
      expect(state.isOrderLoading).toBe(false);
      expect(state.orderRequest).toBe(false);
      expect(state.feed).toBe(feeds.getFeeds.fulfilled.payload);
    });
  });
  describe('Тест getOrders', () => {
    const orders = {
      getOrders: {
        rejected: {
          type: getOrders.rejected.type,
          error: { message: 'error message' }
        },
        fulfilled: {
          type: getOrders.fulfilled.type,
          payload: { orders: ['first', 'second'] }
        }
      }
    };
    test('Тест pending', () => {
      const state = orderSlice.reducer(
        initialState,
        getOrders.pending('pending')
      );
      expect(state.isOrderLoading).toBe(true);
      expect(state.orderRequest).toBe(true);
    });
    test('Тест rejected', () => {
      const state = orderSlice.reducer(initialState, orders.getOrders.rejected);
      expect(state.isOrderLoading).toBe(false);
      expect(state.error).toBe(orders.getOrders.rejected.error.message);
    });
    test('Тест fulfilled', () => {
      const state = orderSlice.reducer(
        initialState,
        orders.getOrders.fulfilled
      );
      expect(state.orderRequest).toBe(false);
      expect(state.orders).toBe(orders.getOrders.fulfilled.payload);
    });
  });
  describe('Тест getOrderByNumber', () => {
    const orderByNumber = {
      getOrderByNumber: {
        pending: { type: getOrderByNumber.pending.type },
        rejected: {
          type: getOrderByNumber.rejected.type,
          error: { message: 'error message' }
        },
        fulfilled: {
          type: getOrderByNumber.fulfilled.type,
          payload: { orders: ['first'] }
        }
      }
    };
    test('Тест pending', () => {
      expect(
        orderSlice.reducer(initialState, orderByNumber.getOrderByNumber.pending)
          .isOrderLoading
      ).toBe(true);
    });
    test('Тест rejected', () => {
      const state = orderSlice.reducer(
        initialState,
        orderByNumber.getOrderByNumber.rejected
      );
      expect(state.error).toBe('error message');
    });
    test('Тест fulfilled', () => {
      const state = orderSlice.reducer(
        initialState,
        orderByNumber.getOrderByNumber.fulfilled
      );
      expect(state.isOrderLoading).toBe(false);
      expect(state.orderModalData).toBe(
        orderByNumber.getOrderByNumber.fulfilled.payload.orders[0]
      );
    });
  });
  describe('Тест orderBurger', () => {
    const orderBurgers = {
      orderBurger: {
        pending: { type: orderBurger.pending.type },
        rejected: {
          type: orderBurger.rejected.type,
          error: { message: 'error message' }
        },
        fulfilled: {
          type: orderBurger.fulfilled.type,
          payload: { order: { number: 'one' } }
        }
      }
    };
    test('Тест pending', () => {
      const state = orderSlice.reducer(
        initialState,
        orderBurgers.orderBurger.pending
      );
      expect(state.isOrderLoading).toBe(true);
      expect(state.orderRequest).toBe(true);
    });
    test('Тест rejected', () => {
      const state = orderSlice.reducer(
        initialState,
        orderBurgers.orderBurger.rejected
      );
      expect(state.isOrderLoading).toBe(false);
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe('error message');
    });
    test('Тест fulfilled', () => {
      const state = orderSlice.reducer(
        initialState,
        orderBurgers.orderBurger.fulfilled
      );
      expect(state.isOrderLoading).toBe(false);
      expect(state.orderModalData?.number).toBe(
        orderBurgers.orderBurger.fulfilled.payload.order.number
      );
    });
  });
});
