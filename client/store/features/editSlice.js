import { createSlice } from '@reduxjs/toolkit';

export const editSlice = createSlice({
  name: 'edit',
  initialState: {
    value: false
  },
  reducers: {
    changeEdit: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeEdit } = editSlice.actions;

export default editSlice.reducer;
