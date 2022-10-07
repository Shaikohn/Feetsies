import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingCart } from "../../../redux/actions/ShoppingCartView.js";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import Card from "@mui/material/Card";

import { CardContent, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { removeOneFromCart, removeWholeCart } from "../../../redux/actions/shoppingCartA.js";


export default function ShoppingView () {

    const { shoppingCartCopy } = useSelector((state) => state.getShoppingCart)
    console.log(shoppingCartCopy)

    const [userId, setUserId] = useState(JSON.parse(localStorage?.getItem('profile')).data.id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShoppingCart(userId));
    }, [])
    
    
    function handleDeleteOne(e) {
        e.preventDefault();
        dispatch(removeOneFromCart(e.target.value));
        dispatch(dispatch(getShoppingCart(userId)));
    }
    
    function handleClearCart(e) {
        e.preventDefault();
        dispatch(removeWholeCart(userId));
        dispatch(dispatch(getShoppingCart(userId)));
    }

    return (
        <div>
            <div>
                <ResponsiveAppBar />
            </div>
            <div>
                {shoppingCartCopy.items?.map(c => (
                    <Container key={c.cartItemid}>
                        <Typography
                            gutterBottom
                            component="h2"
                            sx={{
                                fontSize: 18,
                                listStyle: "none",
                                textDecoration: "none",
                            }}
                        >
                            SHOPPING CART
                        </Typography>
                        <Card sx={{ maxWidth: 345 }}>
                            <Box bgcolor="text.disabled">
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        component="h5"
                                        sx={{
                                            fontSize: 14,
                                            listStyle: "none",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {c.name}
                                    </Typography>
                                    <Typography
                                        component={"span"}
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {`$ ${c.price}`}
                                    </Typography>
                                    <Typography
                                        component={"span"}
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {`Unit x ${c.quantity}`}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={(e) => handleDeleteOne(e)}
                                value={c.cartItemid}
                            >
                                Delete One
                            </Button>
                        </Card>
                        <Typography 
                            gutterBottom
                            component="h5"
                            sx={{
                                fontSize: 14,
                                listStyle: "none",
                                textDecoration: "none",
                            }}
                            >
                            {`Total $ ${shoppingCartCopy.total}`}
                        </Typography>
                    </Container>
                ))}
                <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => handleClearCart(e)}
                    value={shoppingCartCopy}
                >
                    Clear Cart
                </Button>
            </div>
        </div>
    )
}