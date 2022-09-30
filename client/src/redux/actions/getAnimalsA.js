import axios from 'axios';

export const GET_ALL_ANIMALS = "GET_ALL_ANIMALS";

const getAllAnimals = ()=>(dispatch)=>{
    axios("http://localhost:3001/animals")
    .then(res=>{
        dispatch({
            type:GET_ALL_ANIMALS,
            payload: res.data
        })
    })
}

export default getAllAnimals;