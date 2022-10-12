import axios from "axios"


export const GET_ALL_INQUIRIES = 'GET_ALL_INQUIRIES';
export const CLEAN_ALL_INQUERIES = 'CLEAN_ALL_INQUERIES'


export function getAllInquieres() {
    return async function(dispatch) {
        try {
            let queryAllInquieres = await axios.get('/admin/getinquiries')

            return dispatch({
                type: GET_ALL_INQUIRIES,
                payload: queryAllInquieres.data
            })
        } catch (error) {
            throw new ErrorEvent(error)
        }
    }
}


export function delateOneInquery(id) {
    return async function() {
        try {
            await axios.delete(`/admin/inquiry?id=${id}`)
        } catch (error) {
            
        }
    }
}


export function cleanAllInqueries() {
    return async function (dispatch) {
        try {
            await axios.delete('/admin/allinqueries')
            return dispatch({
                type: CLEAN_ALL_INQUERIES,
                payload: []
            })
        } catch (error) {
            throw new ErrorEvent(error)
        }
    }
}


