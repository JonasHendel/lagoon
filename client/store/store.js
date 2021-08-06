import { configureStore } from '@reduxjs/toolkit';
import editReducer from './features/editSlice';
import authReducer from './features/authSlice';
import notifyReducer from './features/notifySlice';
import detailReducer from './features/detailSlice';
import resourceReducer from './features/resourceSlice';
import postReducer from './features/postSlice';
import queryReducer from './features/querySlice';

export default configureStore({
  reducer: {
    edit: editReducer,
    auth: authReducer,
    notify: notifyReducer,
    detail: detailReducer,
    resources: resourceReducer,
    posts: postReducer,
    query: queryReducer,
  },
});
