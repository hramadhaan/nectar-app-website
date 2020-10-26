import {
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_START,
  SET_AUTH_REDIRECT_PATH,
  AUTH_PROFILE,
} from "../action/auth";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  profile: {
    name: null,
    email: null,
  },
  authRedirectPath: "/",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false,
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    case SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      };
    case AUTH_PROFILE:
      return {
        ...state,
        profile: {
          name: action.name,
          email: action.email,
        },
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};
