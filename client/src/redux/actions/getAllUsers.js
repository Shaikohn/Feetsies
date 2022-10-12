import axios from "axios";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const UPDATE_USER_BAN = "UPDATE_USER_BAN";
export const UPDATE_USER_ADMIN = "UPDATE_USER_ADMIN";

export const getAllUsers = () => (dispatch) => {
  axios.get("/admin/getallusers").then((res) => {
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  });
};

export const updateUserBan = (id) => (dispatch) => {
  axios.put(`/admin/toggleban/${id}`).then(() => {
    dispatch({
      type: UPDATE_USER_BAN,
    });
  });
};

export const updateUserAdmin = (id) => (dispatch) => {
  axios.put(`/admin/toggleadmin/${id}`).then(() => {
    dispatch({
      type: UPDATE_USER_ADMIN,
    });
  });
};
