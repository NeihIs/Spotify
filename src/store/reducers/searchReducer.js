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
      globalNavigate("/search/", action.payload.searchText.trim());
      return (state = {
        isSearching: action.payload.searchText.trim() === "" ? false : true,
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
