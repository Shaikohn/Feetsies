import React from "react";
import { Link } from "react-router-dom";
import styles from "./AnimalCard.module.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export default function AnimalCard({ id, name, main_image, sex, size }) {
  return (
    // <div key={id}>
    <Container key={id}>
      <Card sx={{ maxWidth: 345 }} key={id}>
        <Link to={`/home/animals/${id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={main_image}
              alt="animal card image"
            />
            <Box bgcolor="text.disabled">
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {`Sex: ${sex}`}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {`Size: ${size}`}
                </Typography>
              </CardContent>
            </Box>
          </CardActionArea>
        </Link>
      </Card>
    </Container>
    // </div>
  );
}
