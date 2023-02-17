import axios from "axios";
import { storeTokenInLocalStorage } from "../common/token";

const API_URL = "http://localhost:8000/api/";

const register = (username, email, password) => {
  return axios
    .post(API_URL + "register/", {
      username,
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        storeTokenInLocalStorage(response.data.token);
      }
    })
    .catch((err) => console.log(err));
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        storeTokenInLocalStorage(response.data.token);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
  return axios.post(API_URL + "logout/").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return localStorage.getItem("token");
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
