import axios from "axios";
export const AUTH = "AUTH";

export const signIn = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/user/auth/login",
      formData
    );
    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error);
  }
};
