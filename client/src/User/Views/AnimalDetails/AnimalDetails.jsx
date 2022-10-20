import {Link, useNavigate} from "react-router-dom";
import React, { useState } from "react";

import { ButtonBase, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";

/* import images from "./images"; */

/* LAS COSAS COMENTADAS SON NECESARIAS POR SI EN ALGÚN MOMENTO SE LE AGREGAN 
MAS IMAGENES A LOS DETALLES DE LOS PERROS */

export default function AnimalDetails({animal}) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const navigate = useNavigate();
    console.log(animal)

    /* const [selectedImg, setSelectedImg] = useState(images[0]) */

    return (
        <div>
            <Grid 
                height="auto"
                width="auto"
                container
                sx={{
                    display: "flex", 
                    my: 0,
                    mx: 1.5
                }}
                key={animal?.id}
            >   
                {/* <Grid item xs={1} 
                    sx={{
                        border: "5px groove #567900", 
                        borderRadius: "10px",
                        bgcolor: "#ffff9b6e",
                        backdropFilter: "blur(4px)", 
                        my: 4, 
                        mx: 2
                    }}
                >
                </Grid> */}
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
                        image={animal?.main_image}
                        alt={animal?.name}
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
                        // bgcolor: "#bada596e"
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
                            {`${animal?.name}`}
                        </Typography>
                        <Typography variant="h4" component="div" fontFamily="Segoe Print" fontWeight={500}
                            sx={{color: "black", m: 1.5}}
                        >
                            Size: {`${animal?.size}`}
                        </Typography>
                        <Typography variant="h4" component="div" fontFamily="Segoe Print" fontWeight={500}
                            sx={{color: "black", m: 1.5}}
                        >
                            Age: {`${animal?.age}`}
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
                                {`${animal?.description}`}
                            </Typography>
                        </Box>
                        { !user ? (
                            <Box>
                                <ButtonBase
                                    sx={{
                                        my: 2,
                                        width: "200px",
                                        height: "50px",
                                        border: "3px groove #c8ad39",
                                        borderRadius: "15px",
                                        color: "white",
                                        display: "flex",
                                        fontSize: 20,
                                        bgcolor: "black",
                                        fontWeight: 600,
                                    }}
                                    onClick={(e) => {
                                        Swal.fire({
                                            title: "YOU HAVE TO BE LOGGED TO REQUEST ADOPTIONS!",
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
                                    size="large"
                                    variant="outlined"
                                >
                                    ADOPT ME! 💓
                                </ButtonBase>
                            </Box>
                        ) : ( 
                                <Link to={`/home/animals/${animal?.id}/adoption`}>
                                    <ButtonBase
                                        sx={{
                                            my: 2,
                                            width: "200px",
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
                                    >
                                        ADOPT ME! 💓
                                    </ButtonBase>
                                </Link>
                            )
                        }
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
};
