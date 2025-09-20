// langSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === "en" ? "ar" : "en";
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    }
  }
});

export const { toggleLanguage, setLanguage } = langSlice.actions;
export default langSlice.reducer;
