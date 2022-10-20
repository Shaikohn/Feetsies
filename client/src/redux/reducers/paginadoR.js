import { SET_CURRENT_PAGE, RESET_PAGINATION, SET_CURRENT_SEARCH } from "../actions/paginadoA";


const initialState ={
    page: 1,
    pagination: {},
    search: '',
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
        case SET_CURRENT_SEARCH:
            return {
                search: payload
            }

        default:
            return state;
    }
}

export default paginadoReducer;