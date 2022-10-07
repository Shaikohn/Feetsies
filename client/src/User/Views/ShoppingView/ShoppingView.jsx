import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingCart } from "../../../redux/actions/ShoppingCartView.js";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import ShoppingCart from "../../Features/ShoppingCart/ShoppingCart";
import CartItem from "../../Features/CartItem/CartItem.jsx";
import { Typography } from "@mui/material";


export default function ShoppingView () {

    const { shoppingCartCopy } = useSelector((state) => state.getShoppingCart )
    console.log(shoppingCartCopy)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShoppingCart(1));
    }, [])


    return (
        <div>
            <div>
                {shoppingCartCopy.items?.map(c => (
                    <Container key={c.cartItemid}>
                        {/* <CartItem /> */}
                        {/* <Typography 
                            gutterBottom
                            component="h5"
                            sx={{
                                fontSize: 14,
                                listStyle: "none",
                                textDecoration: "none",
                            }}
                            >
                            {`Total $ ${c.total}`}
                        </Typography> */}
                    </Container>
                ))}
            </div>
            <div>
                <ResponsiveAppBar />
            </div>
            <div>
                <ShoppingCart />
            </div>
        </div>
    )
}