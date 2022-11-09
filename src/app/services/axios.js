import axios from "axios";
import { HttpConfig } from "../config/ApiConfig";

let getToken = () => {
  return localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : JSON.parse(sessionStorage.getItem("token")) ?? null;
};

const axiosInstance = axios.create({
  baseURL: HttpConfig.domain,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token !== null && token !== undefined) {
        const auth = token ? `Bearer ${token}` : "";
        config.headers.Authorization = auth;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
      
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      window.location.href = "/logout";
    }

    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
