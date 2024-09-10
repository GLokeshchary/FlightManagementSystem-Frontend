import { combineReducers } from "@reduxjs/toolkit";
import commonreducer from "./slice/commonSlice";
const rootReducer = combineReducers({
  search: commonreducer,
});

export default rootReducer;
