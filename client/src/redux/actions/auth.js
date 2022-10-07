import axios from "axios";
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT"

export const signIn = (formData, navigateTo) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/user/auth/login",
      formData
    );
    dispatch({ type: AUTH, data });
    navigateTo('/');
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
      return dispatch({
        type: LOGOUT
      })
  } catch (error) {
    console.log(error)
  }
}