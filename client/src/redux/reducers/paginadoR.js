import { SET_CURRENT_PAGE, RESET_PAGINATION } from "../actions/paginadoA";


const initialSate ={
    page: 1,
    pagination: {}
}

const paginadoReducer = (state=initialSate,{type,payload})=>{

    switch (type){
        case SET_CURRENT_PAGE:
            return{
                page:payload
            }

        case RESET_PAGINATION:
            return {
                ...state, 
                pagination: action.payload
            }

        default:
            return state;
    }
}

export default paginadoReducer;