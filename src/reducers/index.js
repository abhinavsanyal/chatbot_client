// src/reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import appConfig from "./app-config-slice";

const rootReducer = combineReducers({
  auth: authReducer,
  appConfig: appConfig,
});

export default rootReducer;
