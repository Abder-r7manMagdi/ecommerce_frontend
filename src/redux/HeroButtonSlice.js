import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  buttonLabel: ''
};

const buttonSlice = createSlice({
  name: 'button',
  initialState,
  reducers: {
    setButtonLabel: (state, action) => {
      state.buttonLabel = action.payload;
    }
  }
});

export const { setButtonLabel } = buttonSlice.actions;
export default buttonSlice.reducer;
