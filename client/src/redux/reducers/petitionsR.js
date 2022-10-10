import { GET_ALL_PETITIONS } from "../actions/adoptionAction";


const initialState = {
    petitions: [],
    notifications: []
}


export default function petitionReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PETITIONS: {
            
            return {
                ...state,
                petitions: action.payload,
                notifications: action.payload.filter(n => n.read === false)
            }
        }
    
        default:
            return state
    }
}