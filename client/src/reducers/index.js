import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
// Combine all reducers instances
export default combineReducers({
  alert,
  auth,
  profile,
});
