import axios from "axios"

export const POST_PURCHASE_ORDER = "POST_PURCHASE_ORDER"

export function postPurchaseOrder(payload) {
    console.log(payload)    
    return async function(dispatch) {
        try {
            var json = await axios.post("/cart/save", payload);
            return dispatch({
                type: POST_PURCHASE_ORDER,
                payload: json.data
            });
        } catch(error) {
            console.log(error);
        }
    }
};