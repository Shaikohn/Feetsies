import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearProductDetails, getProductDetails } from "../../../redux/actions/productDetailsActions";
import ProductDetails from "./ProductDetails";
import Header from "../../Features/Header/Header";
import loading from "../ProductHome/Img/Loading.gif";
import styles from "../ProductHome/ProductHome.module.css";

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
            <div className={styles.headerProd}>
                <Header />
            </div>
            {
                <div>
                {Object.keys(product).length > 0 ? (
                    <ProductDetails product={product} />
                    ) : (
                        <div>
                        <img className={styles.loading} src={loading} alt="Loading..." />
                    </div>
                    )
                }
                </div>
            }
        </div>
    )
}