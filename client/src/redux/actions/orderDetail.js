import axios from "axios";
export const GET_ORDER_DETAIL = "GET_ORDER_DETAIL";

const getOrderDetail = (id) => async (dispatch) => {
  try {
    const detail = await axios(`http://localhost:3001/cart/getorder/${id}`);
    return dispatch({
      type: GET_ORDER_DETAIL,
      payload: detail.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getOrderDetail;
