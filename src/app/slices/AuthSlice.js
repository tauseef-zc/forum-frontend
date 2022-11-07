import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createToast,
  toastSuccess,
  toastError,
} from "../services/notification";
import axios from "../services/axios";

const AUTH_REGISTER = "register";

let toastId = null;

const initialState = {
  loading: false,
  error: "",
  message: "",
  user: {},
};

export const registerUser = createAsyncThunk('registerUser', (data) => {
  toastId = createToast();
  const res = axios
    .post(AUTH_REGISTER, data)
    .then((response) => {
        toastSuccess(toastId, response.data);
        return response.data;
    })
    .catch((error) => {
        toastError(toastId, error);
        return Promise.reject(error);
    });

    return res;
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.message = "";
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = "";
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.message = "";
    });
  },
});

export default AuthSlice.reducer;
