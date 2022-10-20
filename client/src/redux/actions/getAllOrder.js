import axios from "axios";
export const GET_ALL_ORDER = "GET_ALL_ORDER";

const getAllOrder = () => async (dispatch) => {
  try {
    const order = await axios.get(`/admin/getAllOrders`);
    return dispatch({
      type: GET_ALL_ORDER,
      payload: order.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getAllOrder;
