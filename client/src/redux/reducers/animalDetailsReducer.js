import { GET_ANIMAL_DETAILS, CLEAR_ANIMAL_DETAILS } from "../actions/animalDetailsActions";

const initialState = {
    animalDetails: {}
}

const animalDetailsReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case GET_ANIMAL_DETAILS:
            return {
                ...state,
                animalDetails: payload
            }
        case CLEAR_ANIMAL_DETAILS:
            return {
                ...state,
                animalDetails: {}
            }
        default: 
            return state
    }
}

export default animalDetailsReducer