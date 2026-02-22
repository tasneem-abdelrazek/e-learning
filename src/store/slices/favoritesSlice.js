import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const course = action.payload;
            const exists = state.favorites.find((item) => item.id === course.id);

            if (exists) {
                state.favorites = state.favorites.filter(
                    (item) => item.id !== course.id
                );
            } else {
                state.favorites.push(course);
            }
        }

    }
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;