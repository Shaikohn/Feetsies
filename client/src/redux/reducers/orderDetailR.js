import { GET_ORDER_DETAIL } from "../actions/orderDetail";

const initialState = {
    orderDetail:{}
}

const orderDetailreducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case GET_ORDER_DETAIL:
            return {
                ...state,
                orderDetail: payload
            }
        // case CLEAR_USER_DETAIL:
        //     return {
        //         ...state,
        //         orderDetail: {}
        //     }
        default: 
            return state
    }
}
export default orderDetailreducer;