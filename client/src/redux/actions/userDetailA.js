import axios from 'axios';
export const GET_USER_DETAIL = "GET_USER_DETAIL"
export const CLEAR_USER_DETAIL = "CLEAR_USER_DETAIL"


export const getUserDetail = (id)=>async (dispatch)=>{
    try {
        const userDetail = await axios(`http://localhost:3001/users/${id}`)
        return dispatch({
            type:GET_USER_DETAIL,
            payload: userDetail.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const clearUserDetail = () => {
    return {
        type: CLEAR_USER_DETAIL,
    }
}