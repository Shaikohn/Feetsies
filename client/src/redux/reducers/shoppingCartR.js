import {
    ADD_TO_CART,
    REMOVE_ONE_FROM_CART,
    REMOVE_WHOLE_CART,
} from "../actions/shoppingCartA.js";

const initialState = {
    cart: [],
    iconCart: 0
}

const shoppingCartReducer = (state = initialState, {type, payload}) => {

    switch(type) {

        case ADD_TO_CART:

            return {
                ...state,
                cart: [...state.cart, payload],
                iconCart: state.iconCart + 1 
            }
            // const newItem = state.cart.find((item) => item.productId === payload.productId);
            // const itemInCart = state.cart.find((item) => item.productId === newItem.productId);
            
            // return itemInCart 
            // ? {
            //     ...state,
            //     cart: state.cart.map((item) => 
            //         item.productId === newItem.productId 
            //         ? {...item, quantity: item.quantity + 1} 
            //         : item
            //     )
            // }
            // : {
            //     ...state,
            //     cart: [...state.cart, {...newItem, quantity: 1}]
            // }
        
        case REMOVE_ONE_FROM_CART:
            return {
                ...state,
                cart: [...state.cart, payload],
                iconCart: state.iconCart - 1
            }
            // const itemToDelete = state.cart.find(i => i.id === payload.id);

            // return itemToDelete.quantity > 1 
            // ? {
            //     ...state,
            //     cart: state.cart.map(i => 
            //         i.id === payload 
            //         ? {...i, quantity: i.quantity - 1}
            //         : i
            //     )
            // } 
            // : {
            //     ...state,
            //     cart: state.cart.filter(i => i.id !== payload)
            // }

        case REMOVE_WHOLE_CART:
            return {
                ...state,
                cart: [...state.cart, payload],
                iconCart: 0
            }
            // return {
            //     ...state,
            //     cart: state.cart.filter(i => i.id !== payload)
            // }

        default: 
            return state
    }
}

export default shoppingCartReducer;