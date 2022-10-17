import { GET_USER_DETAIL, CLEAR_USER_DETAIL } from "../actions/userDetailA";

const initialState = {
    usuario:{}
}

const userDetailReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case GET_USER_DETAIL:
            return {
                ...state,
                usuario: payload
            }
        case CLEAR_USER_DETAIL:
            return {
                ...state,
                usuario: {}
            }
        default: 
            return state
    }
}

export default userDetailReducer;