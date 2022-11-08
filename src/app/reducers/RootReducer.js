import { combineReducers } from "redux";
import AuthReducer from "../slices/AuthSlice";
import SubmitForumReducer from "../slices/SubmitForumSlice";
import ApprovedPostReducer from "../slices/ApprovedPostSlice";
import SinglePostReducer from "../slices/SinglePostSlice";
import SubmitCommentReducer from "../slices/SubmitCommentSlice";

const RootReducer = combineReducers({
  auth: AuthReducer,
  forumSubmit: SubmitForumReducer,
  approvedForums: ApprovedPostReducer,
  single: SinglePostReducer,
  submitComment: SubmitCommentReducer,
});

export default RootReducer;
