import boards from "./boards";
import users from "./users";
import members from "./members";

import { combineReducers } from "redux";

export default combineReducers({
  users,
  boards,
  members,
});
