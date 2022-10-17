import axios from "axios";

export const GET_PURCHASE_ORDERS_BY_USER_ID = "GET_PURCHASE_ORDERS_BY_USER_ID";

export default function getPurchaseOrders (id){
    return async(dispatch)=>{
     const orders = await axios(`http://localhost:3001/cart/getuserorders/${id}`);
     return dispatch({
        type: GET_PURCHASE_ORDERS_BY_USER_ID,
        payload: orders.data
     })
    }
}

