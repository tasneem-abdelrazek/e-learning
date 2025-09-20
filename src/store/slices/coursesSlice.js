// store/slices/coursesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],        
  course: null
};

const coursesSlice = createSlice({
  name: "selectedCourse",
  initialState,
  reducers: {
    setCourses: (state, action) => { // take action from store take all 
      state.courses = action.payload; 
    },
    setSelectedCourse: (state, action) => {
      state.course = action.payload;
    },
    clearSelectedCourse: (state) => {
      state.course = null;
    }
  }
});

//actions
const { setCourses, setSelectedCourse, clearSelectedCourse } = coursesSlice.actions;

export { setCourses, setSelectedCourse, clearSelectedCourse };
export default coursesSlice.reducer;