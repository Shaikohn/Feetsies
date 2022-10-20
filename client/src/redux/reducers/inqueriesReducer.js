import {
  GET_ALL_INQUIRIES,
  CLEAN_ALL_INQUERIES,
  CLEAN_ALL,
  DELETE_ONE_INQUIRY,
} from "../actions/inquiryActions";

const initialState = {
  inqueries: [],
  inqueryDetail: {},
};

export default function inqueriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_INQUIRIES: {
      return {
        ...state,
        inqueries: action.payload,
      };
    }
    case DELETE_ONE_INQUIRY: {
      return {
        ...state,
      };
    }

    case CLEAN_ALL: {
      return {
        ...state,
        inqueries: [],
        inqueryDetail: {},
      };
    }

    default:
      return state;
  }
}
