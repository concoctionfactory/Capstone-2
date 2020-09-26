import axios from "axios";
import { FETCH_USER, SIGNOUT, LOGIN, FETCH_ALL_MEMBERS } from "./types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export function getMembersApi() {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/users/`);
    return dispatch(getMembers(response.data.users));
  };
}

function getMembers(users) {
  return {
    type: FETCH_ALL_MEMBERS,
    users,
  };
}

export function getUserAPI(id) {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return dispatch(getUser(response.data.user));
  };
}

function getUser(user) {
  return {
    type: FETCH_USER,
    user,
  };
}

export function loginUserAPI(data) {
  return async function (dispatch) {
    const token = await axios.post(`${API_URL}/auth/login`, data);
    const user = await axios.get(
      `${API_URL}/users/${data.username}`,
      token.data
    );

    window.localStorage.setItem("_token", JSON.stringify(token.data.token));
    window.localStorage.setItem(
      "username",
      JSON.stringify(user.data.user.username)
    );
    const response = { ...token.data, ...user.data.user };
    return dispatch(loginUser(response));
  };
}

function loginUser(user) {
  return {
    type: LOGIN,
    user,
  };
}

export function signOutUserAPI(data) {
  return async function (dispatch) {
    window.localStorage.removeItem("_token");
    window.localStorage.removeItem("username");
    return dispatch(signOutUser());
  };
}

function signOutUser() {
  return {
    type: SIGNOUT,
  };
}

export function signUpUserAPI(data) {
  return async function (dispatch) {
    const token = await axios.post(`${API_URL}/users`, data);
    const user = await axios.get(
      `${API_URL}/users/${data.username}`,
      token.data
    );

    window.localStorage.setItem("_token", JSON.stringify(token.data.token));
    window.localStorage.setItem(
      "username",
      JSON.stringify(user.data.user.username)
    );
    const response = { ...token.data, ...user.data.user };
    return dispatch(signUpUser(response));
  };
}

function signUpUser(user) {
  return {
    type: LOGIN,
    user,
  };
}

export function updateUserAPI(data) {
  let username = data.username;
  delete data.username;

  return async function (dispatch) {
    const response = await axios.patch(`${API_URL}/users/${username}`, data);
    return dispatch(updateUser(response.data.user));
  };
}

function updateUser(user) {
  return {
    type: LOGIN,
    user,
  };
}
