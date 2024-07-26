// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  username: null,
  email: null,
  profileimage: null,
  mobile: null,
  address: [],
  isAuthenticated: false,
  token: null,
  isAdmin: false,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = 'loading';
    },
    loginSuccess: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.username=action.payload.firstName
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.user.role === 'admin';
      state.email = action.payload.user.email;
      state.profileimage = action.payload.user.profileImage;
      state.mobile = action.payload.user.mobile;
      state.address = action.payload.user.address;
      alert(state.status)

    },
    loginFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      alert('Wrong username or password');
    },
    logout: (state) => {
      state.user = null;
      state.username = null;
      state.isAuthenticated = false;
      state.token = null;
      state.isAdmin = false;
      state.status = 'idle';
      state.error = null;
      state.email = null;
      state.profileimage = null;
      state.mobile = null;
      state.address = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Async action creator for sign-in
export const signinApi = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post('http://localhost:8090/auth/signin', userData);
    console.log('API Response:', response.data); // Log the data from the API
    dispatch(loginSuccess(response.data)); // Assuming response.data includes user and token
  } catch (error) {
    console.log('API Error:', error.message);
    dispatch(loginFailure(error.message));
  }
};

// Selectors
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
