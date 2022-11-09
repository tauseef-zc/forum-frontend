import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";

const FETCH_MY_POSTS = "dashboard/posts";
const DELETE_MY_POST = "dashboard/posts";

const initialState = {
  loading: false,
  error: "",
  message: "",
  search: "",
  forums: {}
};

export const getMyPosts = createAsyncThunk("getMyPosts", async (data) => {
  return await axios.get(FETCH_MY_POSTS, { params: data });
});

export const deletePost = createAsyncThunk("deleteMyPost", async (data) => {
  return await axios.delete(DELETE_MY_POST + `/${data}`);
});

const MyForumsSlice = createSlice({
  name: "my_forum",
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.loading = false;
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyPosts.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = "";
      state.search = "";
    });

    builder.addCase(getMyPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.data.message;
      state.error = "";
      state.search = "";
      state.forums = action.payload.data.data.forums;
    });

    builder.addCase(getMyPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.message = "";
      state.search = "";
    });
    
    builder.addCase(deletePost.pending, (state) => {
      state.message = "";
      state.error = "";
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      console.log(action);
      state.message = action.payload.data.message;
      state.error = "";
      console.log(state.forums);
      // state.forums = state.forums.filter((item) => item.id !== action.meta.arg);
    });

    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.error.message;
      state.message = "";
    });
  },
});

export const { resetForumSubmit } = MyForumsSlice.actions;

export default MyForumsSlice.reducer;
