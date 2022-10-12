import React from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import { CardActionArea } from '@mui/material';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";



export default function AnimalCard({ id, name, main_image, sex, size }) {

  return (

    <Card 
      elevation={5}
      key={id}
      sx={{ 
        maxWidth: 300,
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
      <Link to={`/home/animals/${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="220px"
            image={main_image}
            alt="Animal Img"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div" fontFamily="Segoe Print"
              sx={{color: "#567900", textShadow: "1px 1px 5px rgb(0, 0, 0)"}}
            >
              {name}
            </Typography>
            {sex === "Female" ? (
              <Typography variant="h5" fontFamily="Segoe Print" 
                sx={{color: "black", textShadow: "1px 1px 5px #b93b9f"}}
              >
                {`Sex: ${sex}`}
              </Typography>
            ) : (
              <Typography variant="h5" fontFamily="Segoe Print" 
                sx={{color: "black", textShadow: "1px 1px 5px #2d35ef"}}
              >
                {`Sex: ${sex}`}
              </Typography>
            )}
            {sex === "Female" ? (
              <Typography variant="h5" fontFamily="Segoe Print" 
                sx={{color: "black", textShadow: "1px 1px 5px #b93b9f"}}
              >
                {`Size: ${size}`}
              </Typography>
            ) : (
              <Typography variant="h5" fontFamily="Segoe Print" 
                sx={{color: "black", textShadow: "1px 1px 5px #2d35ef"}}
              >
                {`Size: ${size}`}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
