// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice";
import langReducer from "./slices/langSlice";
import selectedCourseReducer from "./slices/coursesSlice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['selectedCourse'], // auth
};

const rootReducer = combineReducers({
  auth: authReducer,
  lang: langReducer,
  selectedCourse: selectedCourseReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // to loed in local storage

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lang: langReducer,
  },
});

export const persistor = persistStore(store);