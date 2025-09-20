import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    wishlist: [],
};
//create slice 
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,


    //reducer
    reducers: {
        toggleWishlist: (state, action) => {
            const exists = state.wishlist.find(
                (course) => course.id === action.payload.id
            );
            if (exists) {
                state.wishlist = state.wishlist.filter((course) =>
                    course.id !== action.payload.id
                )
            } else {
                state.wishlist.push(action.payload)
            }

        }


    }


})
export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;