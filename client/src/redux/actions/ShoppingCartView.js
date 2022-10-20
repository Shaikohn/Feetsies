import axios from "axios";
import Swal from "sweetalert2";
export const GET_CART = "GET_CART";
export const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";
export const UPDATE_ITEM_QUANTITY_STATE = "UPDATE_ITEM_QUANTITY_STATE";

export function getShoppingCart(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/cart/get/${id}`);
      return dispatch({
        type: GET_CART,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateItemQuantity(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.put("/cart/updateitem", payload);
      return dispatch({
        type: UPDATE_ITEM_QUANTITY,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Not enough stock",
        icon: "error",
        timer: 3000,
      });
    }
  };
}
