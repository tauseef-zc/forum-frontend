import { combineReducers } from "redux";
import AuthReducer from "../slices/AuthSlice";
import SubmitForumReducer from "../slices/SubmitForumSlice";
import ApprovedPostReducer from "../slices/ApprovedPostSlice";
import MyForumsReducer from "../slices/MyForumsSlice";
import SinglePostReducer from "../slices/SinglePostSlice";
import SubmitCommentReducer from "../slices/SubmitCommentSlice";

const RootReducer = combineReducers({
  auth: AuthReducer,
  forumSubmit: SubmitForumReducer,
  approvedForums: ApprovedPostReducer,
  myForums: MyForumsReducer,
  single: SinglePostReducer,
  submitComment: SubmitCommentReducer,
});

export default RootReducer;
