import axios from "axios";
import { HttpConfig } from "../config/ApiConfig";

const axiosInstance = axios.create({
  baseURL: HttpConfig.domain,
});

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
