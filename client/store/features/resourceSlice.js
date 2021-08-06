import { createSlice } from '@reduxjs/toolkit';

export const resourceSlice = createSlice({
  name: 'resources',
  initialState: {
    courses: {},
  },
  reducers: {
    setResources: (state, action) => {
      state.courses = action.payload;
    },
    addFolder: (state, action) => {
      state.courses[action.payload.course].folders = action.payload.folders;
    },
    addFile: (state, action) => {
      state.courses[action.payload.course].files = action.payload.files;
    },
  },
});

export const { setResources, addFolder, addFile } = resourceSlice.actions;

export default resourceSlice.reducer;
