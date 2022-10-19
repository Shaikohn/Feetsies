import axios from "axios";

export const GET_REVIEWS_BY_USER_ID = "GET_REVIEWS_BY_USER_ID";

export default function getReviewsUser (id){
    return async(dispatch)=>{
     const reviews = await axios(`/users/reviews/${id}`);
     return dispatch({
        type: GET_REVIEWS_BY_USER_ID,
        payload: reviews.data
     })
    }
}
