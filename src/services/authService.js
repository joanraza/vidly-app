import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/auth`;
const tokenkey = "token";

http.setJwt(getJwt());

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenkey, jwt);
}

function loginwithJwt(jwt) {
  localStorage.setItem(tokenkey, jwt);
}

function logout() {
  localStorage.removeItem(tokenkey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenkey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenkey);
}

export default {
  login,
  loginwithJwt,
  logout,
  getCurrentUser,
  getJwt
};
