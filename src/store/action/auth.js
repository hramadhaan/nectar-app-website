import axios from "axios";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";
export const AUTH_PROFILE = "AUTH_PROFILE";

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authProfile = (name, email) => {
  return {
    type: AUTH_PROFILE,
    name: name,
    email: email,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: AUTH_LOGOUT,
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
    };
    const url = "http://192.168.1.5:8080/login";
    try {
      const response = await axios.post(url, authData, {
        validateStatus: false,
      });
      const resData = response.data;

      if (resData.status === 200) {
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        dispatch(authSuccess(resData.token, resData.userId));
      } else if (resData.status === 404) {
        dispatch(authFail(resData.message));
      }
    } catch (err) {
      dispatch(authFail(err.message));
      // console.log(err.message);
    }
  };
};

export const profile = () => {
  return async (dispatch) => {
    dispatch(authStart());
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://192.168.1.5:8080/profile/${userId}`,
        {
          validateStatus: false,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = response.data;

      console.log(resData);

      if (resData.status === 200) {
        dispatch(authProfile(resData.data.name, resData.data.email));
      } else {
        dispatch(authFail(resData.message));
      }
    } catch (err) {
      dispatch(authFail(err.message));
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
    }
  };
};
