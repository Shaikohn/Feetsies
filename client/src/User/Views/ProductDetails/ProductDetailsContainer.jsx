import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearProductDetails, getProductDetails } from "../../../redux/actions/productDetailsActions";
import ProductDetails from "./ProductDetails";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";

import CardMedia from "@mui/material/CardMedia";
import { Paper } from "@mui/material";
import Image from "./Img/BgImg3.jpg";
import loading from "./Img/Loading.gif";


export default function ProductDetailsContainer() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const product = useSelector((state) => state.ProductDetails.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(id))
        return () => {
            dispatch(clearProductDetails())
        }
    }, [dispatch, id])

    return (
        <Paper 
            elevation={0} 
            sx={{ 
                backgroundImage: `url(${Image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
            }}
        >   
            <ResponsiveAppBar />
            {
                <div>
                    {Object.keys(product).length > 0 ? (
                        <ProductDetails product={product} />
                        ) : (
                            <CardMedia component="img" image={loading}  alt="Loading..." 
                                sx={{
                                    margin: "auto",
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                        )
                    }
                </div>
            }
        </Paper>
    )
};