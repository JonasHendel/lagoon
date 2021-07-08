import { createSlice } from '@reduxjs/toolkit';

export const editSlice = createSlice({
  name: 'edit',
  initialState: false,
  reducers: {
    changeBoolean: (state) => {
      state = !state;
    },
  },
});

export const { changeBoolean } = editSlice.actions;

export default editSlice.reducer;
