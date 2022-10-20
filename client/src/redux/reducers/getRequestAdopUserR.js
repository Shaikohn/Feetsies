import { GET_REQUEST_ADOPTION_BY_USER_ID } from "../actions/requestAdoptionUser"


const initialState = {
    adoptions:[]
}

const adoptionRequestReducer = (state = initialState, {type, payload}) => {

    switch(type) {
       
        case GET_REQUEST_ADOPTION_BY_USER_ID:
            return {
                ...state,
                adoptions:payload
            }
        default: 
            return state
    }
}

export default adoptionRequestReducer;