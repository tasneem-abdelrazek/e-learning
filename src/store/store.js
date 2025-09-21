// store/index.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// slices
import authReducer from "./slices/authSlice";
import langReducer from "./slices/langSlice";
import selectedCourseReducer from "./slices/coursesSlice";
import wishlistReducer from "./slices/wishlistSlice";
import favoritesReducer from "./slices/favoritesSlice";
import joinedCoursesReducer from "./slices/joinedCoursesSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["selectedCourse", "wishlist", "favorites", "joinedCourses"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  lang: langReducer,
  selectedCourse: selectedCourseReducer,
  wishlist: wishlistReducer,
  favorites: favoritesReducer,
  joinedCourses: joinedCoursesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
