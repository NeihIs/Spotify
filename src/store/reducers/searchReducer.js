import { createSlice } from "@reduxjs/toolkit";
import { globalNavigate } from "../../utils";

const initialState = {
  isSearching: false,
  searchText: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search: (state, action) => {
      return (state = {
        searchText: action.payload.searchText,
      });
    },
    clearSearch: (state) => {
      globalNavigate("/search/");
      return (state = initialState);
    },
  },
});

export const { search, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
