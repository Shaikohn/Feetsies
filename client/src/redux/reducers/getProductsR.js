import { GET_ALL_PRODUCTS } from "../actions/getProductsA"
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


        default:
            return state
    }

}

export default productsReducer;