import {
  USER_LOADING,
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  USER_PROFILE_LOADING,
  USER_PROFILE_LOADED,
  USER_PROFILE_LOADING_FAIL
} from "../constants/ActionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };

    case REGISTER_FAIL:
      return {
        ...state
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case USER_PROFILE_LOADING:
      return {
        ...state
      };

    case USER_PROFILE_LOADED:
      return {
        ...state,
        user: { ...state.user, profile: action.payload }
      };

    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null
      };

    default:
      return state;
  }
};

export default authReducer;
