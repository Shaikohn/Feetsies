import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/shoppingCartA";


import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


import profileIcon from "./Img/profileIcon.jpg";




import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Modals from "../Modals/Modals";
import { useModal } from "../Modals/useModal.js";
import "../Modals/Modals.css";
import Swal from 'sweetalert2'
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import styles from "./ProductCard.module.css";

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
  console.log("quantity", quantity)

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
                sx={{ color: "black", textShadow: "1px 1px 5px white"}}
              >
                {`$ ${price}`}
              </Typography>
              <Typography component={"span"} variant="body2" color="text.secondary">
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 1,
                  // borderRadius: 1,
                  // border: "1px solid black",
                  // bgcorlor: "black"
                }}
              >
                {productTypes.map((tag, index) => {
                  return (
                    <span className={styles.prodTag} key={index}>
                      {tag}
                    </span>
                  );
                })}
              </Stack>
            </Typography>
            </CardContent>
            <Container>
              {!user ? (
                <div>
                  <Button
                    sx={{
                      display: "block",
                      fontSize: 12,
                      bgcolor: "secondary.main",
                      fontWeight: 400,
                      mx: 2,
                    }}
                    size="small"
                    variant="outlined"
                    onClick={openedModal}
                  >
                    Add To Cart
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
                </div>
              ) : (
                <Button
                  sx={{
                    display: "block",
                    fontSize: 12,
                    bgcolor: "secondary.main",
                    fontWeight: 400,
                    mx: 2,
                  }}
                  size="small"
                  variant="outlined"
                  onClick={(e) => handlerAddToCart(e)}
                >
                  Add To Cart
                </Button>
              )}
              {/* <Button
                  sx={{
                    display: "block",
                    fontSize: 12,
                    bgcolor: "secondary.main",
                    fontWeight: 400,
                    mx: 2,
                  }}
                  size="small"
                  variant="outlined"
                  onClick={(e) => handlerAddToCart(e)}
                >
                  Add Cart
                </Button> */}
              <InputLabel id="quantity-label">Quantity</InputLabel>
              <Select
                labelId="quantity-label"
                id="quantity"
                value={quantity}
                label="Quantity"
                onChange={handleChange}
                onClick={(e) => e.stopPropagation()}
              >
                {arrayQuantity.map((m) => (
                  <MenuItem
                    onClick={(e) => e.stopPropagation()}
                    value={m}
                    key={m}
                  >
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </Container>
          </Link>
        </CardActionArea>
      </Card>
  );
}
