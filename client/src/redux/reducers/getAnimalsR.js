import { GET_ALL_ANIMALS } from "../actions/getAnimalsA";

const initialState = {
    allAnimals:[],
    allAnimalsCopy:[]

}

const animalsReducer = (state= initialState,{action,payload})=>{

    switch(action){
        case GET_ALL_ANIMALS:
            return{
                allAnimals:payload,
                allAnimalsCopy:payload
            }
        
        default:
            return state
    }

}

export default animalsReducer;