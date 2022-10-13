import { POST_PURCHASE_ORDER } from "../actions/purchaseOrderAction";


const initialState = {
    
}

const purchaseOrderReducer = (state = initialState, {type, payload}) => {

    switch(type) {
        case POST_PURCHASE_ORDER:
            return {
                ...state,
                
            }
        default: 
            return state
    }
}

export default purchaseOrderReducer;