export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const RESET_PAGINATION = "RESET_PAGINATION";
export const SET_CURRENT_SEARCH = "SET_CURRENT_SEARCH";



export const setPage = (page)=> (dispatch)=>{
  return dispatch({
    type: SET_CURRENT_PAGE,
    payload: page
  })
}

export const setSearch = (search)=> (dispatch)=>{
  return dispatch({
    type: SET_CURRENT_SEARCH,
    payload: search
  })
}

export function resetPagination(payload) {
  return {
    type: RESET_PAGINATION,
    payload
  }
}

