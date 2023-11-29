import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import playerReducer from "./reducers/playerReducer";
import searchReducer from "./reducers/searchReducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
    search: searchReducer,
  },
});

export default store;
