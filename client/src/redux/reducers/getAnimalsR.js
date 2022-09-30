import { GET_ALL_ANIMALS, GET_ANIMAL_NAME } from "../actions/getAnimalsA";


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

        case GET_ANIMAL_NAME:
            return {
                allAnimals: action.payload
            }
        
        default:
            return state
    }

}

export default animalsReducer;