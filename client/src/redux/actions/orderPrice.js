
export const ORDER_PRODUCT_PRICE = "ORDER_PRODUCT_PRICE";

const orderProductPrice = (data)=>(dispatch)=>{
    return dispatch({
        type:ORDER_PRODUCT_PRICE,
        payload:data
    })
}

export default orderProductPrice;