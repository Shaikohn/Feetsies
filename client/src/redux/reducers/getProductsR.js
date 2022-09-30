import { GET_ALL_PRODUCTS, GET_PRODUCT_NAME } from "../actions/getProductsA";

const initialstate = {
    allProducts:[],
    allProductsCopy:[]
}

const productsReducer = (state = initialstate,{action,payload} )=>{
    switch (action){

        case GET_ALL_PRODUCTS:{
            return {
                allProducts:payload,
                allProductsCopy:payload
            }
        }

        case GET_PRODUCT_NAME:
            return {
                allProducts: action.payload
            }

        default:
            return state
    }

}

export default productsReducer;