import { GET_ALL_INQUIRIES, CLEAN_ALL_INQUERIES } from "../actions/inquiryActions";

const initialState = {
    inqueries: [],
    inqueryDetail: {}
}


export default function inqueriesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_INQUIRIES: {
            return {
                ...state,
                inqueries: action.payload
            }
        }
        case CLEAN_ALL_INQUERIES: {
            return {
                ...state,
                inqueries: action.payload
            }
        }
        default:
            return state
    }
}