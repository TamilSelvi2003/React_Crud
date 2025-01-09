import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './userSlice';

export const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});
