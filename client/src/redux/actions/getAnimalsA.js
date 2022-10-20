import axios from "axios";
import Swal from "sweetalert2";
export const GET_ALL_ANIMALS = "GET_ALL_ANIMALS";
export const GET_ANIMAL_NAME = "GET_ANIMAL_NAME";
export const CLEAR_ANIMALS = "CLEAR_ANIMALS";

export const getAllAnimals = () => (dispatch) => {
  axios("/animals")
    .then((res) => {
      dispatch({
        type: GET_ALL_ANIMALS,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export function getAnimalName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/animals/search?search=${name}`);
      return dispatch({
        type: GET_ANIMAL_NAME,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Animal couldnt be found!",
        icon: "error",
        timer: 3000,
      });
      alert(`Animal cant be found! Error: ${error}`);
    }
  };
}

export const clearAnimals = () => {
  return {
    type: CLEAR_ANIMALS,
  };
};
