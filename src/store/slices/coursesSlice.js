import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courses: [],
    loading: false,
    error: null
};
// reducers function
const setCoursesFn = (state, action) => {
    state.courses = action.payload;
};
const setLoadingFn = (state, action) => {
    state.loading = action.payload;
};
const setErrorFn = (state, action) => {
    state.error = action.payload
};
const coursesSlice = createSlice({
    name: "courses",
    initialState,

    // reducer
    reducers: {
        setCourses: setCoursesFn,
        setLoading: setLoadingFn,
        setError: setErrorFn,
    },

});
export const { setCourses, setError, setLoading } = coursesSlice.actions;
export default coursesSlice.reducer;


