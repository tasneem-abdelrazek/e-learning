import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    courses: [], // الكورسات المضافة
  },
  reducers: {
    addCourse: (state, action) => {
      const exists = state.courses.find(c => c.id === action.payload.id);
      if (!exists) {
        state.courses.push({ ...action.payload, status: "" }); // status فارغ بالبداية
      }
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(c => c.id !== action.payload);
    },
    updateCourseStatus: (state, action) => {
      const course = state.courses.find(c => c.id === action.payload.id);
      if (course) course.status = action.payload.status;
    },
  },
});

export const { addCourse, removeCourse, updateCourseStatus } = dashboardSlice.actions;
export default dashboardSlice.reducer;
