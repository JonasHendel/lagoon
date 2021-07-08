import { configureStore } from '@reduxjs/toolkit';
import editReducer from './features.js/editSlice'
import authReducer from './features.js/authSlice'
import notifyReducer from './features.js/notifySlice'

export default configureStore({
  reducer: {
    edit: editReducer,
    auth: authReducer,
    notify: notifyReducer,
  },
})