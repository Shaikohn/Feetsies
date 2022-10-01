export const FILTER_TYPE_PRODUCTS = "FILTER_TYPE_PRODUCTS";

const filterTypeProducts = (data)=>(dispatch)=>{

    return dispatch({
        type: FILTER_TYPE_PRODUCTS,
        payload:data
    })
}

export default filterTypeProducts;