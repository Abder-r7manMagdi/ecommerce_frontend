// src/redux/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import productsData from '../data/allProducts.json';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProductsStart: (state) => {
      state.status = 'loading';
    },
    loadProductsSuccess: (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload;
    },
    loadProductsFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
  },
});

export const { loadProductsStart, loadProductsSuccess, loadProductsFailure, addProduct, removeProduct } = productsSlice.actions;

// Action creator to load products
export const loadProducts = () => (dispatch) => {
  dispatch(loadProductsStart());
  try {
    dispatch(loadProductsSuccess(productsData));
  } catch (error) {
    dispatch(loadProductsFailure(error.message));
  }
};

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;
