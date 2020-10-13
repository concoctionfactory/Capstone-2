import axios from "axios";
import {
  FETCH_USER,
  SIGNOUT,
  LOGIN,
  FETCH_ALL_MEMBERS,
  LOADING_USER,
  ERROR_USER,
} from "./types";

import { API_URL } from "../config";
// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

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
    dispatch(loadingUser());
    let jwt = JSON.parse(window.localStorage.getItem("_token"));
    console.log(id, jwt);

    const response = await axios.get(`${API_URL}/users/${id}`);

    return dispatch(getUser(response.data.user));
  };
}

function loadingUser() {
  return {
    type: LOADING_USER,
  };
}

function getUser(user) {
  return {
    type: FETCH_USER,
    user,
  };
}

export const loginUserAPI = (data) => {
  return async function (dispatch) {
    try {
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
    } catch (error) {
      let data = error.response.data.message;
      // console.log("ERROR", data);
      throw data;
    }
  };
};

export function loginUser(user) {
  // console.log(user);
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
    console.log("token pre");
    try {
      const token = await axios.post(`${API_URL}/users`, data);
      const user = await axios.get(
        `${API_URL}/users/${data.username}`,
        token.data
      );
      console.log("user");
      window.localStorage.setItem("_token", JSON.stringify(token.data.token));
      window.localStorage.setItem(
        "username",
        JSON.stringify(user.data.user.username)
      );
      const response = { ...token.data, ...user.data.user };
      return dispatch(signUpUser(response));
    } catch (error) {
      let data = error.response.data.message;
      console.log(data);
      throw data;
      return dispatch(errorUser(data.message));
    }
  };
}

function errorUser(error) {
  return {
    type: ERROR_USER,
    error,
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
    try {
      const response = await axios.patch(`${API_URL}/users/${username}`, data);
      return dispatch(updateUser(response.data.user));
    } catch (error) {
      let data = error.response.data.message;
      console.log(data);
      throw data;
    }
  };
}

function updateUser(user) {
  return {
    type: LOGIN,
    user,
  };
}
