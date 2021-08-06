import { createSlice } from '@reduxjs/toolkit';

export const notfiySlice = createSlice({
  name: 'notify',
  initialState: {
    error: null,
    success: null,
    loading: false,
  },
  reducers: {
    success: (state, action) => {
      state.success = action.payload;
    },
    error: (state, action) => {
      state.error = action.payload;
    },
    loading: (state) => {
      state.loading = true;
    },
    clearNotify: (state) => {
      state.error = null;
      state.success = null;
      state.loading = false;
    },
  },
});

export const { success, error, loading, clearNotify } = notfiySlice.actions;

export default notfiySlice.reducer;
