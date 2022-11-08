import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createToast, clearToast } from "../services/notification";
import axios from "../services/axios";
import { getSinglePost } from "./SinglePostSlice";

const COMMENT_SUBMIT = "dashboard/posts/";

const initialState = {
  loading: false,
  status: "",
  error: "",
  message: "",
};

export const submitComment = createAsyncThunk("submitComment", (data, { dispatch }) => {
  createToast();
  const res = axios
    .post(COMMENT_SUBMIT + `${data.id}/comment`, data)
    .then((response) => {
      clearToast();
      dispatch(getSinglePost(data.id));
      return response.data;
    })
    .catch((error) => {
      clearToast();
      return Promise.reject(error);
    });

  return res;
});

const SubmitCommentSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetForumSubmit: (state) => {
      state.loading = false;
      state.message = "";
      state.error = "";
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitComment.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = "";
      state.status = "";
    });

    builder.addCase(submitComment.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = "";
      state.status = "success";
    });

    builder.addCase(submitComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.message = "";
      state.status = "error";
    });
  },
});

export const { resetForumSubmit } = SubmitCommentSlice.actions;

export default SubmitCommentSlice.reducer;
