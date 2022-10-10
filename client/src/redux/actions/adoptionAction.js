import axios from "axios"

export const GET_ALL_PETITIONS = 'GET_ALL_PETITIONS';

export function getAllPetitions() {
    return async function(dispatch) {
        try {
            let petitions = await axios.get('http://localhost:3001/admin/getpetitions')

            return dispatch({
                type: GET_ALL_PETITIONS,
                payload: petitions.data
            })
        } catch (error) {
            throw new ErrorEvent(error)
        }
    }
}

export function readAdoption(id) {
   
    return async function(dispatch) {
        try {
            await axios.put(`http://localhost:3001/admin//petition/setread/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
}

export function deletePetition(id) {
    return async function() {
        try {
            await axios.delete(`http://localhost:3001/admin/petition/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
}