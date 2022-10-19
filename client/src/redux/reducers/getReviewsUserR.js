import { GET_REVIEWS_BY_USER_ID } from "../actions/getReviewsUserA";

const initialState = {
    reviews:[]
}

const userReviewsReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case GET_REVIEWS_BY_USER_ID:
            return {
                ...state,
                reviews: payload
            }
        default: 
            return state
    }
}

export default userReviewsReducer;