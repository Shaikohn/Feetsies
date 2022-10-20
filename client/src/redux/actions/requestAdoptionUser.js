import axios from "axios";

export const GET_REQUEST_ADOPTION_BY_USER_ID = "GET_REQUEST_ADOPTION_BY_USER_ID";

export default function getRequestAdoptionsUser (id){
    return async(dispatch)=>{
     const adoption = await axios(`/users/petitions/${id}`);
     return dispatch({
        type: GET_REQUEST_ADOPTION_BY_USER_ID,
        payload: adoption.data
     })
    }
}