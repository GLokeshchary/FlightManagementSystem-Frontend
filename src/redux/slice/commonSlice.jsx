import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "search",
  initialState: {
    searchForm: {},
    LoggedIn: false,
    AdminLogin: false,
  },
  reducers: {
    search: (state, action) => {
      state.searchForm = action.payload;
    },
    login: (state, action) => {
      state.LoggedIn = true;
    },
  },
});

export const { search, login } = commonSlice.actions;

export default commonSlice.reducer;
