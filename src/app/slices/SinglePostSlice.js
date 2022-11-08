import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";

const FETCH_APPROVED_POST = "posts";

const initialState = {
  loading: false,
  error: "",
  message: "",
  forum: {},
  comments: {},
};

export const getSinglePost = createAsyncThunk("getSinglePost", async (data) => {
  return await axios.get(FETCH_APPROVED_POST + "/" + data);
});

const SinglePostSlice = createSlice({
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
    builder.addCase(getSinglePost.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = "";
    });

    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.data.message;
      state.error = "";
      state.forum = action.payload.data.data.forum;
      state.comments = action.payload.data.data.comments;
    });

    builder.addCase(getSinglePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.message = "";
    });
  },
});

export const { resetForumSubmit } = SinglePostSlice.actions;

export default SinglePostSlice.reducer;
