import { createSlice } from '@reduxjs/toolkit';

export const notfiySlice = createSlice({
  name: 'notify',
  initialState: {},
  reducers: {
    notify: (state, action) => {
      state = action.payload;
    },
  },
});

export const { notify } = notfiySlice.actions;

export default notfiySlice.reducer;
