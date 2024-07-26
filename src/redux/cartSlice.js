// src/redux/cartSlice.js

// Import necessary modules
import { createSlice } from '@reduxjs/toolkit'; // Import createSlice from Redux Toolkit

// Define initial state for the cart
const initialState = {
  items: [], // Array to hold items in the cart
  totalQuantity: 0, // Total quantity of items in the cart
  totalPrice: 0, // Total price of all items in the cart
};

// Create a slice for the cart using createSlice from Redux Toolkit
const cartSlice = createSlice({
  name: 'cart', // Slice name
  initialState, // Initial state defined above
  reducers: {
    // Reducer function to add an item to the cart
    addItem: (state, action) => {
      const newItem = action.payload; // Get the new item data from action payload
      const existingItem = state.items.find(item => item.id === newItem.id); // Check if item already exists in cart

      const itemPrice = parseFloat(newItem.price); // Parse item price to float

      // If item already exists, update its quantity and total price
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += itemPrice;
      } else { // Otherwise, add the new item to the cart with initial quantity and price
        state.items.push({ ...newItem, quantity: 1, totalPrice: itemPrice });
      }

      state.totalQuantity++; // Increment total quantity of items in the cart
      state.totalPrice += itemPrice; // Add item price to the total price of the cart
      console.log(state.totalPrice)


    },
    // Placeholder reducers for other cart operations
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter(item => item.id !== id);
      }
      console.log(state.totalPrice)

    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        const itemPrice = parseFloat(existingItem.price);

        existingItem.quantity--;
        existingItem.totalPrice -= itemPrice;
        state.totalQuantity--;
        state.totalPrice -= itemPrice;
        console.log(state.totalPrice)

        if (existingItem.quantity === 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        const itemPrice = parseFloat(existingItem.price);

        existingItem.quantity++;
        existingItem.totalPrice += itemPrice;
        state.totalQuantity++;
        state.totalPrice += itemPrice;
        console.log(state.totalPrice)

        if (existingItem.quantity === 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      console.log(state.totalPrice)

    },
  },
});
// Export actions and reducer from cartSlice
export const { addItem, removeItem, decreaseQuantity,increaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
