import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import appReducer from "./reducers/appReducer";
import playerReducer from "./reducers/playerReducer";
import searchReducer from "./reducers/searchReducer";
// import createReducer from "./reducers/createReducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    player: playerReducer,
    search: searchReducer,
    // create: createReducer
  },
});

export default store;
