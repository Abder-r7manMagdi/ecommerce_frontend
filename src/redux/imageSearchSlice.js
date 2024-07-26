// src/features/imageSearch/imageSearchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageSearchQuery: '',
  imageFile: null,
  selectedImage: null,
};

const imageSearchSlice = createSlice({
  name: 'imageSearch',
  initialState,
  reducers: {
    setImageSearchQuery(state, action) {
      state.imageSearchQuery = action.payload;
    },
    setImageFile(state, action) {
      state.imageFile = action.payload;
    },
    setSelectedImage(state, action) {
      state.selectedImage = action.payload;
    },
    removeImage(state) {
      state.imageFile = null;
      state.selectedImage = null;
    },
  },
});

export const { setImageSearchQuery, setImageFile, setSelectedImage, removeImage } = imageSearchSlice.actions;
export default imageSearchSlice.reducer;
