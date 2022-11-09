import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";

const FETCH_MY_POSTS = "admin/posts";
const DELETE_MY_POST = "admin/posts";
const UPDATE_POST_STATUS = "admin/posts/:id/status/update";

const initialState = {
  loading: false,
  error: "",
  message: "",
  search: "",
  forums: {},
};

export const getAdminPosts = createAsyncThunk("getAdminPosts", async (data) => {
  return await axios.get(FETCH_MY_POSTS, { params: data });
});

export const deletePost = createAsyncThunk("deleteMyPost", async (data) => {
  return await axios.delete(DELETE_MY_POST + `/${data}`);
});

export const updateStatus = createAsyncThunk("updatePostStatus", async (data) => {
  const endPoint = UPDATE_POST_STATUS.replace(':id', data.id);  
  return await axios.put(endPoint, data);
});

const AdminForumsSlice = createSlice({
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
    builder.addCase(getAdminPosts.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = "";
      state.search = "";
    });

    builder.addCase(getAdminPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.data.message;
      state.error = "";
      state.search = "";
      state.forums = action.payload.data.data.forums;
    });

    builder.addCase(getAdminPosts.rejected, (state, action) => {
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
    
    builder.addCase(updateStatus.pending, (state) => {
      state.message = "";
      state.error = "";
    });

    builder.addCase(updateStatus.fulfilled, (state, action) => {
      state.message = action.payload.data.message;
      state.error = "";
    });

    builder.addCase(updateStatus.rejected, (state, action) => {
      state.error = action.error.message;
      state.message = "";
    });
  },
});

export const { resetSearch } = AdminForumsSlice.actions;

export default AdminForumsSlice.reducer;
