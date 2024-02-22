import axios from "axios";
import axiosAPI from ".";

export const login = (data) => {
  return axiosAPI.post(`/login`, data);
};

export const getUser = () => {
  return axiosAPI.get(`/user`);
};

export const logout = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.post("/user/logout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const register = (data) => {
  return axiosAPI.post("/register", data);
};

export const redirectLoginGoogle = () => {
  return axios.get("http://hoangthao.site/public/api/login/google");
};

export const googleCallback = (params) => {
  return axios.get(
    `http://localhost/demo-mediafire/public/api/login/google/callback?${params}`,
    { headers: { accept: "application/json" } }
  );
};
