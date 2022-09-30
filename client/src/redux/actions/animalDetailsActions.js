import axios from "axios"

export const GET_ANIMAL_DETAILS = "GET_ANIMAL_DETAILS"
export const CLEAR_ANIMAL_DETAILS = "CLEAR_ANIMAL_DETAILS"

export const getAnimalDetails = (id) => {
    return async function(dispatch) {
        try {
            let details = (await axios(`/animals/${id}`)).data
            return dispatch({type: GET_ANIMAL_DETAILS, payload: details})
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const clearAnimalDetailes = () => {
    return {
        type: CLEAR_ANIMAL_DETAILS,
    }
}