import { GET_CART, UPDATE_ITEM_QUANTITY } from "../actions/ShoppingCartView";


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
        
        case UPDATE_ITEM_QUANTITY:
            // newQuantity = state.shoppingCartCopy.items[1];
            return {
                ...state, 
                shoppingCartCopy: [...state.shoppingCartCopy, ]
            }
        
        default: 
            return state
    }
}

export default getShoppingCartReducer;