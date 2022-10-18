import { SET_CURRENT_PAGE, RESET_PAGINATION } from "../actions/paginadoA";


const initialState ={
    page: 1,
    pagination: {}
}

const paginadoReducer = (state=initialState,{type,payload})=>{

    switch (type){
        case SET_CURRENT_PAGE:
            return{
                page:payload
            }

        case RESET_PAGINATION:
            return {
                ...state, 
                pagination: payload
            }

        default:
            return state;
    }
}

export default paginadoReducer;