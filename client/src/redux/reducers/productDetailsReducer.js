import { GET_PRODUCT_DETAILS, CLEAR_PRODUCT_DETAILS } from "../actions/productDetailsActions";

const initialState = {
    productDetails: {}
}

const productDetailsReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case GET_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: payload
            }
        case CLEAR_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: {}
            }
        default: 
            return state
    }
}

export default productDetailsReducer