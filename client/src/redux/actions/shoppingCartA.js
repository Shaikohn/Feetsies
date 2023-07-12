import axios from "axios";
import Swal from "sweetalert2";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_WHOLE_CART = "REMOVE_WHOLE_CART";

export function addToCart(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post("/cart/additem", payload);
      dispatch({
        type: ADD_TO_CART,
        payload: json.data,
      });
      payload.navigate("/home/products")
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

export function removeOneFromCart(id, forceUpdate) {
  return async function (dispatch) {
    try {
      var json = await axios.delete(`/cart/remove/${id}`);
      dispatch({
        type: REMOVE_ONE_FROM_CART,
        payload: json.data,
      });
      forceUpdate()
    } catch (error) {
      console.log(error);
    }
  };
}

export function removeWholeCart(id, forceUpdate) {
  return async function (dispatch) {
    try {
      var json = await axios.delete(`/cart/clear/${id}`);
      dispatch({
        type: REMOVE_WHOLE_CART,
        payload: json.data,
      });
      forceUpdate()
    } catch (error) {
      console.log(error);
    }
  };
}
