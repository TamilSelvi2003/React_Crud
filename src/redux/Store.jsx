import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    students: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
