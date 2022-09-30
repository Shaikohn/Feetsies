import { GET_ALL_ANIMALS } from "../actions/getAnimalsA";

const initialState = {
    allAnimals:[],
    allAnimalsCopy:[]

}

const animalsReducer = (state= initialState,{type,payload})=>{

    switch(type){
        case GET_ALL_ANIMALS:
            return{
                ...state,
                allAnimals: payload,
                allAnimalsCopy: payload
            }
        
        default:
            return state
    }

}

export default animalsReducer;