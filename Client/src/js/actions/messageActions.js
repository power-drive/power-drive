import axios from "axios";

import {
  MSGS_LOADING,
  MSGS_LOADING_SUCCESS,
  MSGS_LOADING_FAIL
} from "../constants/ActionTypes";

export const loadMessages = () => (dispatch, getState) => {
  //user loading
  dispatch({
    type: MSGS_LOADING
  });

  axios
    .get("/api/communication/admin/getsent")
    .then(res => {
      dispatch({
        type: MSGS_LOADING_SUCCESS,
        payload: { sent: res.data.emails }
      });
    })
    .catch(err => {
      //   if (err.response && err.response.status) {
      //     dispatch(returnErrors(err.response.data.msg, err.response.status));
      //   }

      dispatch({
        type: MSGS_LOADING_FAIL
      });
    });
};
