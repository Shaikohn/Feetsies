import axios from "axios";
import Swal from "sweetalert2";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCT_NAME = "GET_PRODUCT_NAME";
export const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";

export const getAllProducts = () => (dispatch) => {
  axios("/products/all").then((res) => {
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  });
};

export function getProductName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/products/search?str=${name}`);
      return dispatch({
        type: GET_PRODUCT_NAME,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Product couldnt be found!",
        icon: "error",
        timer: 3000,
      });
    }
  };
}

export const clearProducts = () => {
  return {
    type: CLEAR_PRODUCTS,
  };
};