import Spotify from "../../spotify/api";
import { createSlice } from "@reduxjs/toolkit";
import { globalNavigate } from "../../utils";

const initialState = {
  isUserLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      if (localStorage.getItem("accessToken")) {
        state.isUserLoggedIn = true;
      } else {
        Spotify.getAccessToken();
      }
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.isUserLoggedIn = false;
      setTimeout(() => {
        globalNavigate("/");
      }, 100);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
