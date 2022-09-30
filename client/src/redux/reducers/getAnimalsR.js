import { GET_ALL_ANIMALS, GET_ANIMAL_NAME } from "../actions/getAnimalsA";


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

        case GET_ANIMAL_NAME:
            return {
                allAnimals: payload
            }
        
        default:
            return state
    }

}

export default animalsReducer;