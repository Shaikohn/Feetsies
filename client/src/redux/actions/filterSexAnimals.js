export const FILTER_SEX_ANIMALS = "FILTER_SEX_ANIMALS";

const filterSexAnimals = (data)=> (dispatch)=>{
    return dispatch ({
        type: FILTER_SEX_ANIMALS,
        payload: data
    })
}

export default filterSexAnimals;