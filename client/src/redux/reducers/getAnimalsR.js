import { GET_ALL_ANIMALS, GET_ANIMAL_NAME } from "../actions/getAnimalsA";
import { FILTER_SEX_ANIMALS } from "../actions/filterSexAnimals";
import { FILTER_SIZE_ANIMALS } from "../actions/filterSizeAnimals";

const initialState = {
  allAnimals: [],
  allAnimalsCopy: [],
};

const animalsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_ANIMALS:
      return {
        ...state,
        allAnimals: payload,
        allAnimalsCopy: payload,
      };

    case GET_ANIMAL_NAME:
      return {
        ...state,
        allAnimalsCopy: payload,
      };
    case FILTER_SEX_ANIMALS:
      const filteredSex =
        payload === "All"
          ? state.allAnimals
          : state.allAnimalsCopy.filter((anim) => anim.sex === payload);
      return {
        ...state,
        allAnimalsCopy: filteredSex,
      };
    case FILTER_SIZE_ANIMALS:
        const filteredSize = 
        payload === "All"
        ?state.allAnimals
        :state.allAnimalsCopy.filter( anim => anim.size === payload)
        return {
            ...state,
            allAnimalsCopy: filteredSize
        }
    default:
      return state;
  }
};

export default animalsReducer;
