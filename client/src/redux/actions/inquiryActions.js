import axios from "axios";

export const GET_ALL_INQUIRIES = "GET_ALL_INQUIRIES";
export const CLEAN_ALL_INQUERIES = "CLEAN_ALL_INQUERIES";
export const DELETE_ONE_INQUIRY = "DELETE_ONE_INQUIRY";
export const CLEAN_ALL = "CLEAN_ALL";

export function getAllInquieres() {
  return async function (dispatch) {
    try {
      let queryAllInquieres = await axios.get("/admin/getinquiries");

      return dispatch({
        type: GET_ALL_INQUIRIES,
        payload: queryAllInquieres.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function delateOneInquery(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/admin/inquiry/${id}`);

      return dispatch({
        type: DELETE_ONE_INQUIRY,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanAllInqueries() {
  return async function (dispatch) {
    try {
      await axios.delete("/admin/allinqueries");
      return dispatch({
        type: CLEAN_ALL_INQUERIES,
        payload: [],
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const clearAll = () => {
  return {
    type: CLEAN_ALL,
  };
};
