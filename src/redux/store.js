// src/redux/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import authSlice from './authSlice';
import cartSlice from './cartSlice';
import searchSlice from './searchSlice';
import imageSearchSlice from './imageSearchSlice';
import productsSlice from './productsSclice'; // Ensure correct import spelling
import ordersSlice from './ordersSlice'; // Import ordersSlice

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
};

const rootReducers = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  search: searchSlice,
  imageSearch: imageSearchSlice,
  products: productsSlice,
  orders: ordersSlice, // Add ordersSlice to the combined reducers
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
