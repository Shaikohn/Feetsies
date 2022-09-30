import { SET_CURRENT_PAGE } from "../actions/paginadoA"

const initialSate ={
    page:1
}

const paginadoReducer = (state=initialSate,{type,payload})=>{

    switch (type){
        case SET_CURRENT_PAGE:
            return{
                page:payload
            }
        default:
            return state;
    }
}

export default paginadoReducer;