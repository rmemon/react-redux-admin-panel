import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "../constants/actionTypes";

let BASE_URL = "http://192.192.7.224:8000/api/v1";

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("jwt", response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("jwt", response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};

export const signout = () => {
  localStorage.removeItem("jwt");

  return {
    type: AUTH_USER,
    payload: ""
  };
};
