import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navbarNowPlayingText: "Liked songs",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeNavbarNowPlayingText: (state, action) => {
      state.navbarNowPlayingText = action.payload.text;
    },
  },
});

export const { changeNavbarNowPlayingText } = appSlice.actions;
export default appSlice.reducer;
