import { GET_ALL_PRODUCTS, GET_PRODUCT_NAME } from "../actions/getProductsA";

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
        case GET_PRODUCT_NAME:
            return {
                allProducts: payload
            }
        default:
            return state
    }

}

export default productsReducer;