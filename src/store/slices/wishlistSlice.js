import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlist: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        toggleWishlist: (state, action) => {
            const course = action.payload;
            const exists = state.wishlist.find((item) => item.id === course.id);

            if (exists) {
                state.wishlist = state.wishlist.filter((item) => item.id !== course.id);
            } else {
                state.wishlist.push(course);
            }
        }

    }
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;