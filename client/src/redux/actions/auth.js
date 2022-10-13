import axios from "axios";
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";
export const AUTH_GOOGLE = "AUTH_GOOGLE";

export const signIn = (formData, navigateTo) => async (dispatch) => {
  try {
    const { data } = await axios.post("/user/auth/login", formData);
    dispatch({ type: AUTH, data });
    navigateTo("/");
  } catch (error) {
    console.log(error);
  }
};

export const google = (token, navigateTo) => async (dispatch) => {
  try {
    const { data } = await axios.post("/user/auth/google", { id_token: token });
    dispatch({ type: AUTH_GOOGLE, data });
    navigateTo("/");
  } catch (error) {
    console.log(error);
    alert(error.response.data.msg);
  }
};

// export const google = async (id_token, navigateTo) => async (dispatch) => {
//   try {
//     const { data } = await axios.post("/user/auth/google", id_token);
//     console.log(data);
//     dispatch({ type: AUTH_GOOGLE, data });
//     navigateTo("/");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export function google(token) {
//   return async function (dispatch) {
//     try {
//       var { data } = await axios.post("/user/auth/google", {
//         id_token: token,
//       });
//       console.log(data);
//       return dispatch({
//         type: AUTH_GOOGLE,
//         payload: data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const logout = () => async (dispatch) => {
  try {
    return dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
