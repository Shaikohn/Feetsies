import { GET_ALL_PRODUCTS } from "../actions/getProductsA"
const initialstate = {
    allProducts:[],
    allProductsCopy:[]
}

const productsReducer = (state = initialstate, {type, payload} )=>{
    switch (type) {
        case GET_ALL_PRODUCTS:{
            return {
                ...state,
                allProducts: payload,
                allProductsCopy: payload
            }
        }
        default:
            return state
    }

}

export default productsReducer;