export const FILTER_SIZE_ANIMALS = "FILTER_SIZE_ANIMALS";

const filterSizeAnimals = (data)=> (dispatch)=>{
    return dispatch({
        type: FILTER_SIZE_ANIMALS,
        payload: data
    })
}

export default filterSizeAnimals; 

