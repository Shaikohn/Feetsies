import axios from 'axios';
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

const getAllProducts = ()=>(dispatch)=>{
    axios ("http://localhost:3001/products/getAll")
    .then(res =>{
        dispatch({
            type:GET_ALL_PRODUCTS,
            payload: res.data
        })
    })
}
export default getAllProducts;