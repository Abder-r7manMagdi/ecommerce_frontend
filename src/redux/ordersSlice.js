// src/redux/ordersSlice.js
import { createSlice } from '@reduxjs/toolkit';
import ordersData from '../data/ordersData.json';

const initialState = {
  orders: [],
  status: 'idle',
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    loadOrdersStart: (state) => {
      state.status = 'loading';
    },
    loadOrdersSuccess: (state, action) => {
      state.status = 'succeeded';
      state.orders = action.payload;
    },
    loadOrdersFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    acceptOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.map(order =>
        order.orderId === orderId ? { ...order, status: 'accepted' } : order
      );
    },
    rejectOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.map(order =>
        order.orderId === orderId ? { ...order, status: 'rejected' } : order
      );
    },
    removeOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter(order => order.orderId !== orderId);
    },
  },
});

export const {
  loadOrdersStart,
  loadOrdersSuccess,
  loadOrdersFailure,
  acceptOrder,
  rejectOrder,
  removeOrder,
} = ordersSlice.actions;

// Action creator to load orders
export const loadOrders = () => (dispatch) => {
  dispatch(loadOrdersStart());
  try {
    // Simulating async data loading with ordersData from JSON
    dispatch(loadOrdersSuccess(ordersData));
  } catch (error) {
    dispatch(loadOrdersFailure(error.message));
  }
};

// Selectors
export const selectAllOrders = (state) => state.orders.orders;
export const selectOrdersStatus = (state) => state.orders.status;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;
