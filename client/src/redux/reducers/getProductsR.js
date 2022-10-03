
import { GET_ALL_PRODUCTS, GET_PRODUCT_NAME } from "../actions/getProductsA"
import {ORDER_PRODUCT_PRICE} from "../actions/orderPrice";
import {ORDER_PRODUCT_NAME} from "../actions/orderName";
import { FILTER_TYPE_PRODUCTS } from "../actions/filterTypeProducts";


const initialstate = {
    allProducts:[],
    allProductsCopy:[],
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

        case ORDER_PRODUCT_PRICE:
            const orderedPrice = 
                payload === "desc" ?
                state.allProductsCopy.sort((a, b) => {
                    if (a.price > b.price) {
                      return -1;
                    }
                    if (a.price < b.price) {
                      return 1;
                    } else {
                      return 0;
                    }
                  })
                : [...state.allProductsCopy].sort((a, b) => {
                    if (a.price > b.price) {
                      return 1;
                    }
                    if (a.price < b.price) {
                      return -1;
                    } else {
                      return 0;
                    }
                  })
                return {
                    ...state,
                    allProductsCopy:orderedPrice
                }
                
        case ORDER_PRODUCT_NAME:
          const orderedName = 
                payload === "asc"
                ? state.allProductsCopy.sort((a, b) => {
                  if (a.name > b.name) {
                    return 1;
                  }
                  if (b.name > a.name) {
                    return -1;
                  } else {
                    return 0;
                  }
                })
              : [...state.allProductsCopy].sort((a, b) => {
                  if (a.name > b.name) {
                    return -1;
                  }
                  if (b.name > a.name) {
                    return 1;
                  } else {
                    return 0;
                  }
                })
            return{
              ...state,
              allProductsCopy:orderedName
            }

        case GET_PRODUCT_NAME:
            return {
                ...state,
                allProductsCopy: payload
            }
            
        case FILTER_TYPE_PRODUCTS:
           const filtered  = payload === "All"
           ?state.allProducts
           :state.allProducts.filter(p=>{
            for(let i = 0; i < p.productTypes.length; i++){
              if(p.productTypes[i] === payload){
                return true
              }
            }
            return false
           })
           return {
            ...state,
            allProductsCopy: filtered
           }

        default:
            return state
    }

}

export default productsReducer;