import {
  GET_ALL_PETITIONS,
  GET_PETITION_DETAILS,
  CLEAR_PETITION,
} from "../actions/adoptionAction";

const initialState = {
  petitions: [],
  petitionDetails: {},
  notifications: [],
};

export default function petitionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PETITIONS: {
      return {
        ...state,
        petitions: action.payload.sort((a, b) => a.id - b.id),
        notifications: action.payload.filter((n) => n.read === false),
      };
    }
    case GET_PETITION_DETAILS: {
      return {
        ...state,
        petitionDetails: action.payload,
      };
    }

    case CLEAR_PETITION: {
      return {
        ...state,
        petitions: [],
        petitionDetails: {},
      };
    }

    default:
      return state;
  }
}
