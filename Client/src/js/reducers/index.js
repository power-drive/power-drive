import { combineReducers } from "redux";

import authReducer from "./authReducer";
import MessageReducer from "./messageReducer";

export default combineReducers({
  auth: authReducer,
  message: MessageReducer
});
