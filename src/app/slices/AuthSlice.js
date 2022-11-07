import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createToast,
  toastSuccess,
  toastError,
} from "../services/notification";
import axios from "../services/axios";

const AUTH_REGISTER = "register";
const AUTH_LOGIN = "login";

let toastId = null;

const initialState = {
  loading: false,
  error: "",
  message: "",
  user: {},
  token: null,
  is_logged: false,
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

export const loginUser = createAsyncThunk("loginUser", (data) => {
  toastId = createToast();
  const res = axios
    .post(AUTH_LOGIN, data)
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
  reducers: {
    logout: (state) => {
      state.is_logged = false;
      localStorage.clear();
    },
  },
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

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.user = {};
      state.token = null;
      state.is_logged = false;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.error = "";
      state.is_logged = true;

      localStorage.setItem(
        "user_data",
        JSON.stringify(action.payload.data.user)
      );
      localStorage.setItem("token", JSON.stringify(action.payload.data.token));
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.message = "";
    });
  },
});


export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;
