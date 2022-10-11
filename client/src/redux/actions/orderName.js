export const ORDER_PRODUCT_NAME = "ORDER_PRODUCT_NAME";

const orderProductName = (data)=> (dispatch)=>{
    return dispatch({
        type:ORDER_PRODUCT_NAME,
        payload:data
    })
}

export default orderProductName;