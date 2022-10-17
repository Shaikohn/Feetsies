import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate  } from "react-router-dom";
import { addToCart } from "../../../redux/actions/shoppingCartA";
import { getShoppingCart } from "../../../redux/actions/ShoppingCartView";
import CheckoutForm from "../../Features/CheckoutForm/CheckoutForm";
import { useModal } from "../../Features/Modals/useModal";
import Modals from "../../Features/Modals/Modals";
import "../../Features/Modals/Modals.css"
import Swal from 'sweetalert2';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import { ButtonBase, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import profileIcon from "./Img/profileIcon.jpg"


const stripePromise = loadStripe("pk_test_51LpgGdIsUHqf6y0peEPMdjCDcsjuA2sdBcEGka27crrsnZrTLBpIdJZiAICPkWXYWeJzwabRyk2WtbH0yfdxmGFy0046Eu9UuK")

export default function ProductDetails({product}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [isOpenModal, openedModal, closeModal] = useModal(false);

    const [userId, setUserId] = useState(JSON.parse(localStorage?.getItem("profile"))?.data.id);
    

    function handlerAddToCart(e) {
        e.preventDefault();
        dispatch(addToCart({ userId, productId: product.id, quantity: 1 }));
        Swal.fire({
            title: 'Product added', 
            text: 'Now you can see it in your cart', 
            icon: 'success',
            timer: 1000
        });
        dispatch(getShoppingCart(userId));
    }

    return (
        <Elements stripe={stripePromise} >
            <Grid  
                height="auto"
                width="auto"
                container
                sx={{
                    display: "flex",
                    my: 0,
                    mx: 1.5
                }}
                key={product?.id}
            >
                <Grid item xs={1} 
                    sx={{
                        border: "5px groove #567900", 
                        borderRadius: "10px",
                        bgcolor: "#ffff9b6e",
                        backdropFilter: "blur(4px)", 
                        my: 4, 
                        mx: 2
                    }}
                >
                    <Box>
                        {/* <div className={styles.imagesContainer}>
                            <img className={styles.selected} src={selectedImg} alt="" />
                            <div className={styles.notSelected}>
                                {
                                    images.map((img, i) => (
                                        <img 
                                        style={{border: selectedImg === img ? "4px solid purple": ""}}
                                        key={i} 
                                        src={img} 
                                        alt="dog"
                                        onClick={() => setSelectedImg(img)}
                                        />
                                    ))
                                }
                            </div>
                        </div> */}
                    </Box>
                </Grid>
                <Grid item xs={5} 
                    sx={{ 
                        // border: "5px groove #567900", 
                        borderRadius: "10px",
                        bgcolor: "#ffff9b6e",
                        backdropFilter: "blur(4px)", 
                        my: 4, 
                        mx: 2, 
                        p: 4
                    }}
                >
                    <CardMedia
                        component="img"
                        height="500px"
                        width="500px"
                        image={product?.image}
                        alt={product?.name}
                        sx={{
                            borderRadius: "20px",
                            border: "5px groove #567900", 
                        }}
                    />
                </Grid>
                <Grid item xs={5} 
                    sx={{
                        border: "5px groove #567900", 
                        borderRadius: "10px",
                        my: 4, 
                        mx: 2, 
                        backdropFilter: "blur(4px)", 
                        bgcolor: "#ffff9b6e"
                    }}
                >
                    <Box 
                        display="flex" 
                        sx={{
                            flexDirection: "column", 
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h3" component="div" fontFamily="Segoe Print" fontWeight={700}
                            sx={{color: "#567900", textShadow: "1px 1px 5px rgb(0, 0, 0)", m: 2.5}}
                        >
                            {`${product?.name}`}
                        </Typography>
                        <Typography variant="h3" component="div" fontFamily="Segoe Print" fontWeight={500}
                            sx={{color: "black", m: 1.5}}
                        >
                            {`$${product?.price}`}
                        </Typography>
                        <Typography variant="h4" component="div" fontFamily="Segoe Print" fontWeight={500}
                            sx={{color: "black", m: 1.5}}
                        >
                            {`Stock: ${product?.stock}`}
                        </Typography>
                        <Typography variant="h4" component="div" fontFamily="Segoe Print" fontWeight={500}
                            sx={{color: "black", m: 1.5}}
                        >
                            Description 
                        </Typography>
                        <Box width={400} height={120} 
                            sx={{
                                border: "3px groove #c8ad39",
                                borderRadius: "10px",
                                m: 1,
                                px: 1.5,
                                py: 1,
                                display: "flex",
                                justifyContent: "flex-start"
                            }}
                        >
                            <Typography variant="h6" component="div" >
                                {`${product?.description}`}
                            </Typography>
                        </Box>
                        {!user ?
                            <Box sx={{display: "flex"}}>
                                <ButtonBase
                                    sx={{
                                        my: 2,
                                        mx: 4,
                                        width: "160px",
                                        height: "50px",
                                        border: "3px groove #c8ad39",
                                        borderRadius: "15px",
                                        color: "white",
                                        display: "flex",
                                        fontSize: 20,
                                        bgcolor: "black",
                                        fontWeight: 600,
                                    }}
                                    size="large"
                                    variant="outlined"
                                    onClick={() => {
                                        Swal.fire({
                                            title: "YOU HAVE TO BE LOGGED TO BUY A PRODUCT!",
                                            icon: "warning",
                                            showDenyButton: true,
                                            denyButtonText: "Cancel",
                                            confirmButtonText: "Sign in",
                                            confirmButtonColor: "green",
                                            }).then((res) => {
                                            if (res.isConfirmed) {
                                            navigate("/signUp");
                                            }
                                            });
                                        }}
                                >
                                    Buy
                                </ButtonBase>
                                <ButtonBase
                                    sx={{
                                        my: 2,
                                        mx: 4,
                                        width: "160px",
                                        height: "50px",
                                        border: "3px groove #c8ad39",
                                        borderRadius: "15px",
                                        color: "white",
                                        display: "flex",
                                        fontSize: 20,
                                        bgcolor: "black",
                                        fontWeight: 600,
                                    }}
                                    size="large"
                                    variant="outlined"
                                    onClick={() => {
                                        Swal.fire({
                                            title: "YOU HAVE TO BE LOGGED TO USE THE CART!",
                                            icon: "warning",
                                            showDenyButton: true,
                                            denyButtonText: "Cancel",
                                            confirmButtonText: "Sign in",
                                            confirmButtonColor: "green",
                                            }).then((res) => {
                                                if (res.isConfirmed) {
                                            navigate("/signUp");
                                                }
                                            });
                                        }}
                                >
                                    Add To Cart
                                </ButtonBase>
                            </Box> 
                        :
                            <Box sx={{display: "flex"}}>
                                <ButtonBase
                                    sx={{
                                        my: 2,
                                        mx: 4,
                                        width: "160px",
                                        height: "50px",
                                        border: "3px groove #c8ad39",
                                        borderRadius: "15px",
                                        color: "white",
                                        display: "flex",
                                        fontSize: 20,
                                        bgcolor: "black",
                                        fontWeight: 600,
                                    }}
                                    size="large"
                                    variant="outlined"
                                    onClick={openedModal}
                                >
                                    Buy
                                </ButtonBase>
                                <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
                                    <h2 className="modalTitle">MAKE YOUR PURCHASE WITH YOUR CREDIT CARD!</h2>
                                    <h3 className="modalPrice">{`$${product?.price}`}</h3>
                                    <div>
                                        <img src={product?.image} alt="" width="200px" height="200px" />
                                    </div>
                                    <div>
                                        <CheckoutForm product={product} />
                                    </div>  
                                    <div>
                                        <button className="modalClose" onClick={closeModal}>
                                            CLOSE
                                        </button>
                                    </div>
            </Modals>
                                <ButtonBase
                                    sx={{
                                        my: 2,
                                        mx: 4,
                                        width: "160px",
                                        height: "50px",
                                        border: "3px groove #c8ad39",
                                        borderRadius: "15px",
                                        color: "white",
                                        display: "flex",
                                        fontSize: 20,
                                        bgcolor: "black",
                                        fontWeight: 600,
                                    }}
                                    size="large"
                                    variant="outlined"
                                    onClick={(e) => handlerAddToCart(e)}
                                >
                                    Add To Cart
                                </ButtonBase>
                            </Box>
                        }
                    </Box>
                </Grid>
            </Grid>
        </Elements>
    )
};