import axios from "axios"

export const GET_CART = "GET_CART";

export function getShoppingCart(id) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/cart/get/${id}`);
            return dispatch({
                type: GET_CART,
                payload: json.data
            });
        } catch(error) {
            console.log(error);
        }
    }
};
