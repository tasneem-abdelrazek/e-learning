import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    joinedCourses: [],
};

const joinedCoursesSlice = createSlice({
    name: "joinedCourses",
    initialState,
    reducers: {

        addJoinedCourse: (state, action) => {
            const course = action.payload;
            const exists = state.joinedCourses.find((c) => c.id === course.id);

            if (!exists) {
                state.joinedCourses.push({ ...course, progress: course.progress || 0 });
            }
        },


        removeJoinedCourse: (state, action) => {
            state.joinedCourses = state.joinedCourses.filter(
                (c) => c.id !== action.payload
            );
        },
        //Progress
        updateProgress: (state, action) => {
            const { id, progress } = action.payload;
            const course = state.joinedCourses.find((c) => c.id === id);
            if (course) {
                course.progress = Math.min(progress, 100);
            }
        },
    },
});

export const {
    addJoinedCourse,
    removeJoinedCourse,
    updateProgress,
} = joinedCoursesSlice.actions;

export default joinedCoursesSlice.reducer;