import {
    ADD_TO_CART,
    REMOVE_ONE_FROM_CART,
    REMOVE_ALL_FROM_CART,
    CLEAR_CART
} from "../actions/shoppingCartA.js";

const initialState = {
    productsBuy: [],
    productsBuyCopy: [],
    cart:[],
}

const shoppingCartReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case ADD_TO_CART:
            return {
                ...state,
                productsBuy: payload
            }
        case REMOVE_ONE_FROM_CART:
            return {

            }
        case REMOVE_ALL_FROM_CART:
            return {

            }
        
        case CLEAR_CART:
            return {

            }

        default: 
            return state
    }
}

export default shoppingCartReducer;