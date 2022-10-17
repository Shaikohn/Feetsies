import { GET_CART, UPDATE_ITEM_QUANTITY, UPDATE_ITEM_QUANTITY_STATE } from "../actions/ShoppingCartView";


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
            return {
                ...state
            //     shoppingCartCopy: {items: state.shoppingCartCopy.items?.map((item) => 
            //         item.cartItemid === newItemQuantity.cartItemid 
            //         ? {...item, quantity: newItemQuantity.quantity} 
            //         : item
            // )}}
            }
        case UPDATE_ITEM_QUANTITY_STATE:
            const newItemQuantity = state.shoppingCartCopy.items?.find((item) => item.cartItemid === payload.cartItemId);
            return {
                ...state,
                shoppingCartCopy: {items: state.shoppingCartCopy.items?.map((item) => 
                            item.cartItemid === newItemQuantity.cartItemid 
                            ? {...item, quantity: newItemQuantity.quantity} 
                            : item
                    )}
            }

        default: 
            return state
    }
}

export default getShoppingCartReducer;