/* eslint-disable prettier/prettier */
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {counterSlice} from './reducers/counterSlice';
import authSlice from './reducers/authSlice';
import userSlice from './reducers/userSlice';
import {persistStore, persistReducer} from 'redux-persist';
// import { encryptTransform } from "redux-persist-transform-encrypt";
// import hireSlice from './reducers/hireSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  // transforms: [
  //   encryptTransform({
  //     secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  //     onError: function (error) {
  //       console.log(error);
  //     },
  //   }),
  // ],
};

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
