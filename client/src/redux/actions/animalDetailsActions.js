import axios from "axios"

export const GET_ANIMAL_DETAILS = "GET_ANIMAL_DETAILS"
export const CLEAR_ANIMAL_DETAILS = "CLEAR_ANIMAL_DETAILS"

export const getAnimalDetails = (id) => {
    return async function(dispatch) {
        try {
            await axios(`http://localhost:3001/animals/${id}`)
            .then(res=>{
                dispatch({
                    type: GET_ANIMAL_DETAILS,
                    payload: res.data
                })
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const clearAnimalDetails = () => {
    return {
        type: CLEAR_ANIMAL_DETAILS,
    }
}