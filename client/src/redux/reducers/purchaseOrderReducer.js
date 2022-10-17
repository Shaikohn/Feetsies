import { POST_PURCHASE_ORDER } from "../actions/purchaseOrderAction";
import { GET_PURCHASE_ORDERS_BY_USER_ID } from "../actions/getOrdersUser";


const initialState = {
    purchaseOrder:[]
}

const purchaseOrderReducer = (state = initialState, {type, payload}) => {

    switch(type) {
        case POST_PURCHASE_ORDER:
            return {
                ...state,
                
            }
        case GET_PURCHASE_ORDERS_BY_USER_ID:
            return {
                ...state,
                purchaseOrder:payload
            }
        default: 
            return state
    }
}

export default purchaseOrderReducer;