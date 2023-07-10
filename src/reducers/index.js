// src/reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import appConfigReducer from "./app-config-slice";
import chatReducer from "./chat-slice";

const rootReducer = combineReducers({
  auth: authReducer,
  appConfig: appConfigReducer,
  chat: chatReducer,
});

export default rootReducer;
