import {LOGIN, LOGOUT} from "./actionTypes";


export const login = (token: string) => ({
  type: LOGIN,
  payload: {
    token
  }
});

export const logout = () => ({
  type: LOGOUT,
  payload: {
  }
});

