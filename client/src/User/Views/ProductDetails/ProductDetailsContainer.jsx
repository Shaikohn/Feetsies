import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearProductDetails, getProductDetails } from "../../../redux/actions/productDetailsActions";
import ProductDetails from "./ProductDetails";

export default function ProductDetailsContainer() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const product = useSelector((state) => state.ProductDetails.productDetails) 
    console.log(product)

    useEffect(() => {
        dispatch(getProductDetails(id))
        return () => {
            dispatch(clearProductDetails())
        }
    }, [dispatch, id])

    return (
        <div>
            {
                <ProductDetails product={product} />
            }
        </div>
    )
}