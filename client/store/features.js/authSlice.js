import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    setAuth: (state, action) => {
      state = action.payload
    } 
  }
})

export const {setAuth} = authSlice.actions

export default authSlice.reducer