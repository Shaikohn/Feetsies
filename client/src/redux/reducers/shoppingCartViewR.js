import { GET_CART } from "../actions/ShoppingCartView";


const initialState = {
    shoppingCart: [],
    shoppingCartCopy: []
}

const getShoppingCartReducer = (state = initialState, {type, payload}) => {

    switch(type) {

        case GET_CART:
            return {
                ...state,
                shoppingCart: payload,
                shoppingCartCopy: payload,
            }
        default: 
            return state
    }
}

export default getShoppingCartReducer;