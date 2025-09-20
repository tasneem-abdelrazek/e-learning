// store/index.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import langReducer from "./slices/langSlice";
import selectedCourseReducer from "./slices/coursesSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["selectedCourse"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  lang: langReducer,
  selectedCourse: selectedCourseReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ن redux-persist
    }),
});

export const persistor = persistStore(store);