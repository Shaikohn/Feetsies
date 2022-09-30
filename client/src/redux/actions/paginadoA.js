export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";


const setPage = (page)=> (dispatch)=>{
    return dispatch({
      type: SET_CURRENT_PAGE,
      payload: page
    })
  }

export default setPage;