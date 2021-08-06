import {createSlice} from '@reduxjs/toolkit'

export const querySlice = createSlice({
  name: 'query',
  initialState: {
    page: '',
    path: ['root'],
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    setPath: (state, action) => {
      state.path = action.payload
    },
    addFolderToPath: (state, action) => {
      console.log(action.payload)
      state.path.push(action.payload)
    }
  }
})

export const {setPage, setPath,addFolderToPath} = querySlice.actions

export default querySlice.reducer