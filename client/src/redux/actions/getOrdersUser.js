import axios from "axios";

export const GET_PURCHASE_ORDERS_BY_USER_ID = "GET_PURCHASE_ORDERS_BY_USER_ID";

export default function getPurchaseOrders (id){
    return async(dispatch)=>{
     const orders = await axios(`/cart/getuserorders/${id}`);
     return dispatch({
        type: GET_PURCHASE_ORDERS_BY_USER_ID,
        payload: orders.data
     })
    }
}

