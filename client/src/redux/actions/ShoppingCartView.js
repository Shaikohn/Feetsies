import axios from "axios"

export const GET_CART = "GET_CART";
export const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY"

export function getShoppingCart(id) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`/cart/get/${id}`);
            return dispatch({
                type: GET_CART,
                payload: json.data
            });
        } catch(error) {
            console.log(error);
        }
    }
};

export function updateItemQuantity(payload) {
    return async function(dispatch) {
        try {
            var json = await axios.put("/cart/updateitem", payload);
            return dispatch({
                type: UPDATE_ITEM_QUANTITY,
                payload: json.data
            })
        } catch(error) {
            console.log(error);
        }
    }
}