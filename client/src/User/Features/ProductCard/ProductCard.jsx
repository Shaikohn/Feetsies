import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/shoppingCartA";
import Modals from "../Modals/Modals";
import { useModal } from "../Modals/useModal.js";
import Swal from 'sweetalert2';
import profileIcon from "./Img/profileIcon.jpg";
import "../Modals/Modals.css";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Box, CardActions } from "@mui/material";
import Button from "@mui/material/Button";
import Add from '@mui/icons-material/Add';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";



export default function ProductCard({ id, name, image, price, productTypes }) {

  const arrayQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [isOpenModal, openedModal, closeModal] = useModal(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [userId, setUserId] = useState(
    JSON.parse(localStorage?.getItem("profile"))?.data.id
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [quantity, setQuantity] = React.useState("");

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  function handlerAddToCart(e) {
    e.preventDefault();
    dispatch(addToCart({ userId, productId: id, quantity }));
    if(quantity === "") {
      Swal.fire({
        title: 'Product not added', 
        text: 'You have to select a quantity!', 
        icon: 'error',
        timer: 3000
      });
    }
    if(quantity >= 1) {
      Swal.fire({
        title: 'Product added', 
        text: 'Now you can see it in your cart', 
        icon: 'success',
        timer: 3000
      });
    }
  }
  
  return (

    <Card 
      elevation={5}
      key={id}
      sx={{ 
        maxWidth: 345,
        border: "1px solid #bada59",
        borderRadius: 3,
        bgcolor: "#ffff9bb0",
        boxShadow: "0px 0px 10px 5px rgb(135 168 39);",
        transition: "0.3s",
        animation: "ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 0px 10px 8px rgb(92, 116, 20)"
        }
      }} 
    >
      <CardActionArea>
        <Link to={`/home/products/${id}`}>
          <CardMedia
            component="img"
            height="220px"
            image={image}
            alt="Product Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div" fontFamily="Segoe Print"
              sx={{color: "#567900", fontSize: 25, textShadow: "1px 1px 5px rgb(0, 0, 0)"}}
            >
              {name}
            </Typography>
            <Typography variant="h5" fontFamily="Segoe Print"
              sx={{ mt: 1.5, color: "black", fontSize: 28,  textShadow: "1px 1px 5px white"}}
            >
              {`$ ${price}`}
            </Typography>
            <Typography component="div" color="text.secondary"
              sx={{display: "flex", justifyContent: "center"}}
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 2.5,
                }}
              >
                {productTypes.map((tag, index) => {
                  return (
                    <Typography key={index} 
                      sx={{
                        color: "black",
                        fontSize: 14, 
                        display: "flex",
                        alignItems: "center",
                        mx: 1, 
                        border: "1px dashed #567900",
                        borderRadius: 2,
                        bgcolor: "#fedf6a" 
                      }}
                    >
                      <LocalOfferIcon sx={{mx: 0.7, width: 15, height: 15, color: "#567900"}}/>
                      <Typography sx={{fontSize: 14, mx: 0.5}}>
                        {tag}
                      </Typography>
                    </Typography>
                  );
                })}
              </Stack>
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions sx={{dispaly: "flex", justifyContent: "space-evenly"}}>
        {!user ? (
          <Box>
            <Button
              startIcon={<Add />}
              sx={{
                display: "flex",
                fontSize: 12,
                bgcolor: "secondary.main",
                fontWeight: 400,
                mx: 1,
              }}
              size="small"
              variant="outlined"
              onClick={openedModal}
            >
              ADD TO CART
            </Button>
            <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
              <h2 className="modalTitle">
                YOU HAVE TO BE LOGGED TO USE THE CART!
              </h2>
              <div>
                <img
                  src={profileIcon}
                  alt=""
                  width="200px"
                  height="200px"
                />
              </div>
              <div>
                <button
                  className="modalConfirm"
                  onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  SIGN UP!
                </button>
                <button
                  className="modalClose"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  CLOSE
                </button>
              </div>
            </Modals>
          </Box>
        ) : (
          <Button
            startIcon={<Add />}
            sx={{
              display: "flex",
              fontSize: 12,
              bgcolor: "secondary.main",
              fontWeight: 400,
              mx: 1,
            }}
            size="small"
            variant="outlined"
            onClick={(e) => handlerAddToCart(e)}
          >
            ADD TO CART
          </Button>
        )}
        <InputLabel id="quantity-label" sx={{color: "black"}}>x</InputLabel>
          <Select
                labelId="quantity-label"
                id="quantity"
                value={quantity}
                label="Quantity"
                onChange={handleChange}
                sx={{height: 25}}
              >
                {arrayQuantity.map((m) => (
                  <MenuItem
                    value={m}
                    key={m}
                  >
                    {m}
                  </MenuItem>
                ))}
              </Select>
      </CardActions>
    </Card>
  );
}
