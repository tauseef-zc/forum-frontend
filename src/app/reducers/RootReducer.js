import { combineReducers } from "redux";
import AuthReducer from "../slices/AuthSlice";

const RootReducer = combineReducers({
  auth: AuthReducer,
});

export default RootReducer;
