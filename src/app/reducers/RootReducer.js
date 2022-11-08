import { combineReducers } from "redux";
import AuthReducer from "../slices/AuthSlice";
import SubmitForumReducer from "../slices/SubmitForumSlice";

const RootReducer = combineReducers({
  auth: AuthReducer,
  forumSubmit: SubmitForumReducer,
});

export default RootReducer;
