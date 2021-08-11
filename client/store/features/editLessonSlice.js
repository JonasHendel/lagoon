import { createSlice } from '@reduxjs/toolkit';

export const editLessonSlice = createSlice({
  name: 'editLesson',
  initialState: {
    value: {},
  },
  reducers: {
    setLesson: (state, action) => {
      state.value = action.payload;
    },
    clearLesson: (state) => {
      state.value = {};
    },
  },
});

export const { setLesson, clearLesson } = editLessonSlice.actions;

export default editLessonSlice.reducer;
