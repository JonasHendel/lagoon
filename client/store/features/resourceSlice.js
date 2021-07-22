import {createSlice} from '@reduxjs/toolkit';

export const resourceSlice = createSlice({
    name: 'resources',
    initialState: {
        value: {}
    },
    reducers: {
        addResources: (state, action) => {
          const {payload} = action
          state.value = {...payload};
        },
    },
});

export const {addResources} = resourceSlice.actions;

export default resourceSlice.reducer;