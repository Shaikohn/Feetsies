export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const RESET_PAGINATION = "RESET_PAGINATION";



export const setPage = (page)=> (dispatch)=>{
  return dispatch({
    type: SET_CURRENT_PAGE,
    payload: page
  })
}

export function resetPagination(payload) {
  return {
    type: RESET_PAGINATION,
    payload
  }
}

