import { GET_ALL_ORDER } from "../actions/getAllOrder";

const initialState = {
  orders: [],
};

const orderDetailreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_ORDER:
      return {
        ...state,
        orders: payload,
      };
    default:
      return state;
  }
};
export default orderDetailreducer;
