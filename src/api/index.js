import axios from "axios";
import configs from "@/configs";

const axiosAPI = axios.create({
  baseURL: configs.baseUrl,
  headers: { "X-Custom-Header": "foobar" },
});

axiosAPI.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosAPI.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosAPI;
