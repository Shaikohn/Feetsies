import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/shoppingCartA";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import styles from "./ProductCard.module.css";

export default function ProductCard({ id, name, image, price, productTypes }) {

  const arrayQuantity = Array.from(Array(10).keys())

  const userId = 2 // to do remove

  const dispatch = useDispatch(); 

  function handlerAddToCart(e) {
    e.preventDefault();
    dispatch(addToCart({userId, productId: id, quantity}));
  }

  const [quantity, setQuantity] = React.useState('');
  
  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <Container>
      <Card sx={{ maxWidth: 345 }} key={id}>
        <Link to={`/home/products/${id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt="product card image"
            />
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
                <Button 
                  sx={{ display: 'block', fontSize: 12, 
                  bgcolor: "secondary.main", 
                  fontWeight: 400,
                  mx: 2
                  }}
                  size="small"
                  variant="outlined"
                  onClick={(e) => handlerAddToCart(e)}
                  >
                    Add Cart
                </Button>
                <InputLabel id="quantity-label">Quantity</InputLabel>
                <Select
                  labelId="quantity-label"
                  id="quantity"
                  value={quantity}
                  label="Quantity"
                  onChange={handleChange}
                  onClick={(e) => e.stopPropagation()}
                >
                  {arrayQuantity.map(m => (
                    <MenuItem onClick={(e) => e.stopPropagation()} value={m} key={m}>{m}</MenuItem>
                  ))
                  }
                </Select>
              </Container>
            </Box>
          </CardActionArea>
        </Link>
      </Card>
    </Container>
  );
}