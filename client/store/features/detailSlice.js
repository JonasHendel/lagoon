import { createSlice } from '@reduxjs/toolkit';

export const detailSlice = createSlice({
  name: 'detail',
  initialState: {
    value: {},
  },
  reducers: {
    setDetail: (state, action) => {
      state.value = action.payload;
    },
    clearDetail: (state) => {
      state.value = {};
    },
  },
});

export const { setDetail, clearDetail } = detailSlice.actions;

export default detailSlice.reducer;
