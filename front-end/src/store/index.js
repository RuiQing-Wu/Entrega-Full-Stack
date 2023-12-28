import { configureStore } from '@reduxjs/toolkit';
import userReducer from './module/user';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
