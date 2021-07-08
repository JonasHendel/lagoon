import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    user: {},
  },
  reducers: {
    setAuth: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },
    clearAuth: (state) => {
      state.user = {}
      state.token = ''
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
