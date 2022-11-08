import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createToast,
  clearToast,
} from "../services/notification";
import axios from "../services/axios";

const FORUM_SUBMIT = "dashboard/posts/submit";
const ADMIN_FORUM_SUBMIT = "admin/posts/submit";

const initialState = {
  loading: false,
  status: "",
  error: "",
  message: "",
};

export const submitForum = createAsyncThunk("submitForum", (data) => {
  createToast();
  const endpoint = data.userType === "Admin" ? FORUM_SUBMIT : ADMIN_FORUM_SUBMIT;
  const res = axios
    .post(endpoint, data)
    .then((response) => {
      clearToast();
      return response.data;
    })
    .catch((error) => {
      clearToast();
      return Promise.reject(error);
    });

  return res;
});

const SubmitForumSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetForumSubmit: (state) => {
      state.loading = false;
      state.message = "";
      state.error = "";
      state.status = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(submitForum.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error   = "";
      state.status   = "";
    });

    builder.addCase(submitForum.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error   = "";
      state.status = "success";
    });

    builder.addCase(submitForum.rejected, (state, action) => {
      state.loading = false;
      state.error   = action.error.message;
      state.message = "";
      state.status = "error";
    });

  },
});

export const { resetForumSubmit } = SubmitForumSlice.actions;

export default SubmitForumSlice.reducer;
