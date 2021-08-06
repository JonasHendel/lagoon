import {createSlice} from '@reduxjs/toolkit'

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    courses: {}
  },
  reducers: {
    setPost: (state, action) => {
      state.courses = action.payload
    },
    addPost: (state, action) => {
      console.log(action.payload.course)
      state.courses.Mathe.unshift(action.payload.post)
    }
  }
})

export const {setPost, addPost} = postSlice.actions
export default postSlice.reducer