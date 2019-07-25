import axios from "axios";
import {
  USER_LOADED,
  AUTH_ERROR,
  USER_LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  USER_PROFILE_LOADING,
  USER_PROFILE_LOADED
} from "../constants/ActionTypes";
import { returnErrors, clearServerState, returnSuccess } from "./errorActions";

/**  CHECK TOKEN AND LOAD TEACHER**/

export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({
    type: USER_LOADING
  });

  axios
    .get("/api/teacher/data", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
      }

      dispatch({
        type: AUTH_ERROR
      });
    });
};

/*** REGISTER TEACHER ***/
export const register = body => dispatch => {
  //Headers

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .post("/api/teacher/signup", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.data
      });

      dispatch(returnSuccess(res.data.msg, res.status));
    })
    .catch(err => {
      if (err.response && err.response.data) {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "REGISTER_FAIL"
          )
        );
      }

      dispatch({ type: REGISTER_FAIL });
    });
};

/*** TEACHER LOGIN ***/
export const login = condition => dispatch => {
  //Headers

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .post("/api/teacher/login", condition, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(clearServerState());
      dispatch(loadUser());
    })
    .catch(err => {
      if (err.response) {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
      }
      dispatch({ type: LOGIN_FAIL });
    });
};

/*** TEACHER LOGOUT ***/
export const logout = () => (dispatch, getState) => {
  //user loading
  dispatch({
    type: USER_LOADING
  });

  axios
    .get("/api/teacher/logout", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "LOGOUT_FAIL"
          )
        );
      }
    });
};

/*** GET TEACHER PROFILE ***/

export const getTeacherProfile = () => (dispatch, getState) => {
  //user loading
  dispatch({
    type: USER_PROFILE_LOADING
  });

  axios
    .get("/api/teacher/profile", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_PROFILE_LOADED,
        payload: res.data.profile
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "PROFILE_LOADING_FAIL"
          )
        );
      }
    });
};

/*
 *
 *
 *
 */
// Setup Config/Headers and token

export const tokenConfig = getState => {
  //get token
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
