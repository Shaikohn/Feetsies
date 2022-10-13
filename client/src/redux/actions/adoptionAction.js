import axios from "axios"

export const GET_ALL_PETITIONS = 'GET_ALL_PETITIONS';
export const GET_PETITION_DETAILS = 'GET_PETITION_DETAILS';

export function getAllPetitions() {
    return async function(dispatch) {
        try {
            let petitions = await axios.get('/admin/getpetitions')

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
            await axios.put(`/admin//petition/setread/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
}
export function unReadAdoption(id) {
   
    return async function(dispatch) {
        try {
            await axios.put(`/admin/petition/setunread/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
}

export function deletePetition(id) {
    return async function() {
        try {
            await axios.delete(`/admin/petition/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
}


export function toggleimportance(id) {
    return async function() {
        try{
            await axios.put(`/admin/petition/toggleimportant/${id}`)
        } catch (error) {
            throw new ErrorEvent(error)
        }
    }
}

export function getPetitionDetails(petitionid) {
    return async function(dispatch) {
        try{
            let petitionDetails = await axios.get(`/admin/petition/${petitionid}`)
            dispatch({
                type: GET_PETITION_DETAILS,
                payload: petitionDetails.data
            })
        } catch (error) {
            throw new ErrorEvent(error)
        }
    }
}