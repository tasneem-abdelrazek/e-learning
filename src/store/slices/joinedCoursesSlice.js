import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    joinedCourses: [],
};

const joinedCoursesSlice = createSlice({
    name: "joinedCourses",
    initialState,
    reducers: {
        addJoinedCourse: (state, action) => {
            // نتأكد ما نضيفش كورس مكرر
            const exists = state.joinedCourses.find(
                (course) => course.id === action.payload.id
            );
            if (!exists) {
                state.joinedCourses.push(action.payload);
            }
        },
        removeJoinedCourse: (state, action) => {
            state.joinedCourses = state.joinedCourses.filter(
                (course) => course.id !== action.payload
            );
        },
    },
});

export const { addJoinedCourse, removeJoinedCourse } =
    joinedCoursesSlice.actions;
export default joinedCoursesSlice.reducer;