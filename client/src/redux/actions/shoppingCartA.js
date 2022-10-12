import axios from "axios"

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_WHOLE_CART = "REMOVE_WHOLE_CART";


export function addToCart(payload) {
    console.log(payload)    
    return async function(dispatch) {
        try {
            var json = await axios.post("/cart/additem", payload);
            return dispatch({
                type: ADD_TO_CART,
                payload: json.data
            });
        } catch(error) {
            console.log(error);
        }
    }
};

export function removeOneFromCart(id) {
    return async function(dispatch) {
        try {
            var json = await axios.delete(`/cart/remove/${id}`);
            return dispatch({
                type: REMOVE_ONE_FROM_CART,
                payload: json.data
            });
        } catch(error) {
            console.log(error);
        }
    }
};

export function removeWholeCart(id) {
    return async function(dispatch) {
        try {
            var json = await axios.delete(`/cart/clear/${id}`);
            return dispatch({
                type: REMOVE_WHOLE_CART,
                payload: json.data
            });
        } catch(error) {
            console.log(error);
        }
    }
};


