import axios from 'axios';
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCT_NAME = "GET_PRODUCT_NAME";

export const getAllProducts = ()=>(dispatch)=>{
    axios ("http://localhost:3001/products/all")
    .then(res =>{
        dispatch({
            type:GET_ALL_PRODUCTS,
            payload: res.data
        })
    })
}

export function getProductName(name) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/products/search?str=${name}`);
            return dispatch({
                type: GET_PRODUCT_NAME,
                payload: json.data
            });
        } catch(error) {
            alert (`Product cant be found! Error: ${error}`);
        }
    }
}
