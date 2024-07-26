// src/redux/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';
import data from '../data/allProducts.json'; // Assuming your data is in this file

const initialState = {
  query: '',
  category: 'All Categories',
  results: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    searchItems: (state) => {
      const { query, category } = state;
      state.results = data.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) &&
        (category === 'All Categories' || item.topLevelCategory === category)
      );
      console.log(state.results)
    },
  },
});

export const { setQuery, setCategory, searchItems } = searchSlice.actions;

export default searchSlice.reducer;
