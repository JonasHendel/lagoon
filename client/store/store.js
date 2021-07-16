import { configureStore } from '@reduxjs/toolkit';
import editReducer from './features/editSlice';
import authReducer from './features/authSlice';
import notifyReducer from './features/notifySlice';
import counterReducer from './features/counterSlice';
import detailReducer from './features/detailSlice';

export default configureStore({
  reducer: {
    edit: editReducer,
    auth: authReducer,
    notify: notifyReducer,
    counter: counterReducer,
    detail: detailReducer,
  },
});
