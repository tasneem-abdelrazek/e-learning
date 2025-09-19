import { createSlice } from "@reduxjs/toolkit";



// intial
const inatialState = {
    favorites: [],
};

//crerate slice
const favSlice = createSlice({
    name: " favorites",
    inatialState,
    // reducer
    reducers: {
        toggelFavorite: (state, action) => {
            const exists = state.favorites.find(
                (course) => course.id === action.payload.id
            );
            if (exists) {
                state.favorites = state.favorites.filter(
                    (course) => course.id !== action.payload.id
                );
            }
            else {
                state.favorites.push(action.payload)
            }
        }

    }

})
export const { toggleFavorite } = favSlice.actions;


export default favSlice.reducer;