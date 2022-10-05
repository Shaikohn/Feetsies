import React from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import styles from "./ProductCard.module.css";

export default function ProductCard({ id, name, image, price, productTypes }) {
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
            </Box>
          </CardActionArea>
        </Link>
      </Card>
    </Container>
  );
}
