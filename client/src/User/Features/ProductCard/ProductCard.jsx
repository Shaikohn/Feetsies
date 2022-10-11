import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/shoppingCartA";
import profileIcon from "./Img/profileIcon.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Modals from "../Modals/Modals";
import { useModal } from "../Modals/useModal.js";
import "../Modals/Modals.css";

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

  function handlerAddToCart(e) {
    e.preventDefault();
    dispatch(addToCart({ userId, productId: id, quantity }));
  }

  const [quantity, setQuantity] = React.useState("");

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <Container>
      <Card sx={{ maxWidth: 345 }} key={id}>
        <CardActionArea>
          <Link to={`/home/products/${id}`}>
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt="product card image"
            />
          </Link>
          <Box bgcolor="text.disabled">
            <CardContent>
              <Typography
                gutterBottom
                component="h5"
                // className={styles.prodName}
                sx={{
                  fontSize: 14,
                  listStyle: "none",
                  textDecoration: "none",
                }}
              >
                {name}
              </Typography>
              <Typography
                component={"span"}
                variant="body2"
                color="text.secondary"
              >
                {`$ ${price}`}
              </Typography>
            </CardContent>
            <Typography
              component={"span"}
              variant="body2"
              color="text.secondary"
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 1,
                  borderRadius: 1,
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
          </Box>
        </CardActionArea>
      </Card>
    </Container>
  );
}
