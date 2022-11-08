import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";

const FETCH_APPROVED_POSTS = "posts";

const initialState = {
  loading: false,
  error: "",
  message: "",
  search: "",
  forums: {}
};

export const getApprovedPosts = createAsyncThunk("getApprovedPosts", async (data) => {
  return await axios.get(FETCH_APPROVED_POSTS, { params: data });
});

const ApprovedPostSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.loading = false;
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getApprovedPosts.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = "";
      state.search = "";
    });

    builder.addCase(getApprovedPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.data.message;
      state.error = "";
      state.search = "";
      state.forums = action.payload.data.data.forums;
    });

    builder.addCase(getApprovedPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.message = "";
      state.search = "";
    });
  },
});

export const { resetForumSubmit } = ApprovedPostSlice.actions;

export default ApprovedPostSlice.reducer;
