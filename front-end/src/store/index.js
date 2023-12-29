import { configureStore } from '@reduxjs/toolkit';
import userReducer from './module/user';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
