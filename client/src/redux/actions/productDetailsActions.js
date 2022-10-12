import axios from "axios"

export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS"
export const CLEAR_PRODUCT_DETAILS = "CLEAR_PRODUCT_DETAILS"

export const getProductDetails = (id) => {
    return async function(dispatch) {
        try {
            await axios(`/products/${id}`)
            .then(res=>{
                dispatch({
                    type: GET_PRODUCT_DETAILS,
                    payload: res.data
                })
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const clearProductDetails = () => {
    return {
        type: CLEAR_PRODUCT_DETAILS,
    }
}