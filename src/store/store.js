// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Slices
import authReducer from "./slices/authSlice";
import langReducer from "./slices/langSlice";
import coursesReducer from "./slices/coursesSlice";
import favoritesReducer from "./slices/favoritesSlice";
import wishlistReducer from "./slices/wishlistSlice";
import dashboardReducer from "./slices/dashboardSlice";
import joinedCoursesReducer from "./slices/joinedCoursesSlice";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["selectedCourse", "dashboard"], // ← حفظ selectedCourse + dashboard
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  lang: langReducer,
  selectedCourse: coursesReducer,
  favorites: favoritesReducer,
  wishlist: wishlistReducer,
  joinedCourses: joinedCoursesReducer,
  dashboard: dashboardReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);
