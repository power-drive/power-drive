import {
  MSGS_LOADING,
  MSGS_LOADING_SUCCESS,
  MSGS_LOADING_FAIL
} from "../constants/ActionTypes";

const initialState = {
  isLoading: false
};

const MessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MSGS_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case MSGS_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload
      };

    case MSGS_LOADING_FAIL:
      return {
        isLoading: false,
        ...state
      };

    default:
      return state;
  }
};

export default MessageReducer;
