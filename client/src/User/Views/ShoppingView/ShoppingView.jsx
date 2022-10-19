import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingCart, updateItemQuantity, updateItemQuantityState } from "../../../redux/actions/ShoppingCartView.js";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import Card from "@mui/material/Card";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Modals from "../../Features/Modals/Modals";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "../../Features/Modals/Modals.css";
import { CardContent, Grid, IconButton, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import {
  removeOneFromCart,
  removeWholeCart,
} from "../../../redux/actions/shoppingCartA.js";
import { useModal } from "../../Features/Modals/useModal.js";
import ShoppingCheckout from "./ShoppingCheckout.jsx";
import styles from "./ShoppingCheckout.module.css";
// import emptyCart from "./Img/emptyCart.png";
import Dog from "./Img/Dog.jpg";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/system";
import Image from "./Img/BgImg2.jpg";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const stripePromise = loadStripe(
  "pk_test_51LpgGdIsUHqf6y0peEPMdjCDcsjuA2sdBcEGka27crrsnZrTLBpIdJZiAICPkWXYWeJzwabRyk2WtbH0yfdxmGFy0046Eu9UuK"
);

export default function ShoppingView() {


  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const { shoppingCartCopy } = useSelector((state) => state.getShoppingCart);

  console.log(shoppingCartCopy)

  const [load, setLoad] = useState(false);


  const [isOpenModal, openedModal, closeModal] = useModal(false);

  const [userId, setUserId] = useState(JSON.parse(localStorage?.getItem("profile")).data.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if(userId) {
        dispatch(getShoppingCart(userId));
    }
    setLoad(false);
  }, [reducerValue, userId]);

  function handleDeleteOne(e) {
    e.preventDefault();
    dispatch(removeOneFromCart(e.target.value));
    forceUpdate();
    Swal.fire({
      title: 'Product removed', 
      text: 'The product has been removed from the cart', 
      icon: 'success',
      timer: 1000
    });
  }

  function handleClearCart(e) {
    e.preventDefault();
    dispatch(removeWholeCart(userId));
    forceUpdate();
  }

  function handleChangeQuantity(e, newQuant, cartItemId) {
    e.preventDefault();
    setLoad(true);
    dispatch(updateItemQuantity({cartItemId, newQuant}));
    forceUpdate();
  }


  if (shoppingCartCopy.total < 1) {
    return (
      <Paper 
        elevation={0}
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0.8, 0, 0)),url(${Image})`,
          height: "100%",
          minHeight: "100vh"
        }}
      >
        <ResponsiveAppBar />
        <Typography
          variant="h2"
          sx={{
            color: "#black",
            textShadow: "1px 1px 8px #bada59",
            m: 10,
            fontWeight: "700"
          }}
        >
          Your cart is currently empty
        </Typography>
        {/* <img alt="cart" height="400px" width="500px" src={emptyCart} /> */}
        <ProductionQuantityLimitsIcon 
          fontSize="large" 
          sx={{
            color: "black",
            width: 500, 
            height: 400,
          }}
        />
      </Paper>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <Paper 
        elevation={0}
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0.8, 0, 0)),url(${Image})`,
          height: "100%",
          minHeight: "100vh"
        }}
      >
        <ResponsiveAppBar />
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              color: "#black",
              textShadow: "1px 1px 8px #bada59",
              m: 4,
              ml: 16,
              fontWeight: "700"
            }}
          >
            Shopping Cart
          </Typography>
          <Button
            sx={{mx: 2, display: "flex", }}
            size="small"
            variant="contained"
            onClick={(e) => {
              Swal.fire({
                title: "Warning",
                text: "Are you sure you want to remove all products from the cart?",
                icon: "warning",
                showDenyButton: true,
                denyButtonText: "Cancel",
                confirmButtonText: "Confirm",
                confirmButtonColor: "green",
              }).then((res) => {
                if (res.isConfirmed) {
                  handleClearCart(e);
                }
              });
            }}
            value={shoppingCartCopy}
          >
            <Typography 
              variant="h6"  
              sx={{
                display: "flex", 
                fontWeight: 500, 
                fontSize: 22,
                mx: 2
              }}
            >
              Clear Cart
            </Typography>
            <DeleteForeverIcon sx={{width: 30, height: 30}}/>
          </Button>
        </Box>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
          <Typography 
              variant="h3"
              sx={{
                display: "flex",
                color: "#black",
                textShadow: "1px 1px 8px #fedf6a",
                mx: 4,
                fontWeight: "600",
              }}
            >
              {`Total $ ${shoppingCartCopy.total}`}
            </Typography>
            <Button 
              sx={{mx: 2, width: "200px", display: "flex", }}
              size="large" 
              variant="contained" 
              onClick={openedModal}
            >
              <Typography 
                variant="h5" 
                sx={{
                  display: "flex", 
                  fontWeight: 600, 
                  fontSize: 26,
                  mx: 4
                }}
              >
                Buy
              </Typography>
              <ShoppingCartCheckoutIcon sx={{width: 30, height: 30}}/>
            </Button>
        </Box>
        <Grid 
          container 
          columnSpacing={5} 
          rowSpacing={3} 
          sx={{my: 0, mx: 1.5, display: "flex", alignItems: "center"}} 
          width="auto" 
          height="auto"
        >
          {shoppingCartCopy.items?.sort((a, b) => a.cartItemId - b.cartItemId).map((c) => (
            <Grid item xs={3} key={c.cartItemid}>
              <Box bgcolor="#ffff9b6e" 
                sx={{
                  borderRadius: "20px",
                  backdropFilter: "blur(4px)",
                  border: "5px groove #567900",
                  
                }}
              >
                <Box 
                  bgcolor="text.disabled" 
                  sx={{
                    borderRadius: "20px", 
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                >
                  <CardContent 
                    sx={{
                      display: "flex", 
                      flexDirection: "column",
                      alignItems: "center",
                      padding: 2
                    }}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        fontFamily: "Segoe Print",
                        fontSize: 25,
                        textShadow: "1px 1px 5px white"
                      }}
                    >
                      {c.name}
                    </Typography>
                    <Typography gutterBottom sx={{fontSize: 17, fontWeight: 600}}>
                      {`Unit $ ${c.price / c.quantity}`}
                    </Typography>
                    <Typography gutterBottom sx={{fontSize: 17, fontWeight: 600}}>
                      {`Subtotal $ ${c.price}`}
                    </Typography>
                    <Typography
                      gutterBottom
                      sx={{
                        fontFamily: "Segoe Print",
                        fontSize: 18,
                        textShadow: "1px 1px 5px white",
                        mt: 1.5
                      }}
                    >
                      {`Unit x ${c.quantity}`}
                    </Typography>
                    <Box 
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        border: "3px groove #c8ad39",
                        borderRadius: "15px",
                        bgcolor: "#000000ad",
                        color: "white",
                        mt: 1,
                      }}
                    >
                      <IconButton 
                        onClick={(e) => {handleChangeQuantity(e, c.quantity - 1, c.cartItemid)}} 
                        disabled={load}
                      >
                        <RemoveIcon sx={{color: "#567900"}}/>
                      </IconButton>
                      <Typography sx={{mx: 2}}>
                        {c.quantity} {load && <CircularProgress color="success" />} 
                      </Typography>
                      <IconButton  
                        onClick={(e) => {handleChangeQuantity(e, c.quantity + 1, c.cartItemid)}} 
                        disabled={load}
                      >
                        <AddIcon sx={{color: "#567900"}}/>
                      </IconButton>
                    </Box>
                  </CardContent>
                </Box>
                <Button
                  size="medium"
                  variant="contained"
                  sx={{bgcolor: "black", color: "white", maxWidth: "auto"}}
                  onClick={(e) => {
                    handleDeleteOne(e);
                  }}
                  value={c.cartItemid}
                >
                  Delete Product
                </Button>
              </Box>
            </Grid>
          ))}
          <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
            <h2 className="modalTitle">MAKE YOUR PET HAPPY!</h2>
            <h2 className="modalPrice">{`$${shoppingCartCopy.total}`}</h2>
            <div>
              <img src={Dog} alt="" width="200px" height="200px" />
            </div>
            <div className={styles.buyInputs}>
              <ShoppingCheckout />
            </div>
            <div>
              <button
                className="modalClose"
                onClick={() => {
                  closeModal();
                  forceUpdate();
                }}
              >
                CLOSE
              </button>
            </div>
          </Modals>
        </Grid>
      </Paper>
    </Elements>
  );
}
