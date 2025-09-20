import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import coursesReducer from "./slices/coursesSlice";
import favReducer from "./slices/favoritesSlice";
import wishlistReducer from "./slices/wishlistSlice";
import joinedCourseReducer from "./slices/joinedCoursesSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    favorites: favReducer,
    wishlist: wishlistReducer,
    joinedCourses: joinedCourseReducer,
  },
});
