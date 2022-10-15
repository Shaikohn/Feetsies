import {Link, useNavigate} from "react-router-dom";
import React, { useState }/* , { useState } */ from "react";
import styles from "./AnimalDetails.module.css"
import Button from "@mui/material/Button";
import Swal from 'sweetalert2';
import { Box, Container } from "@mui/system";
import { ButtonBase, CardMedia, Typography } from "@mui/material";

/* import images from "./images"; */

/* LAS COSAS COMENTADAS SON NECESARIAS POR SI EN ALGÚN MOMENTO SE LE AGREGAN 
MAS IMAGENES A LOS DETALLES DE LOS PERROS */

export default function AnimalDetails({animal}) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const navigate = useNavigate();

    /* const [selectedImg, setSelectedImg] = useState(images[0]) */

    return (
        <Container 
            sx={{
                display: "flex",
                textAlign: "center"
            }}
            key={animal?.id}
        >
            <CardMedia
                component="img"
                height="300px"
                width="300px"
                image={animal?.main_image}
                alt={animal?.name}
                sx={{
                    borderRadius: "10px"
                }}
                margin={10}
            />
            <Container>
                <Box>
                    <Typography variant="h1" fontWeight={700}>
                        {`${animal?.name}`}
                    </Typography>
                    <Typography variant="h2" fontWeight={500}>
                        Size: {`${animal?.size}`}
                    </Typography>
                    <Typography variant="h2" fontWeight={500}>
                        Age: {`${animal?.age}`}
                    </Typography>
                    <Typography variant="h2" fontWeight={500}>
                        Description: {`${animal?.description}`}
                    </Typography>
                    { !user ? (
                        <Box>
                            <ButtonBase
                                sx={{
                                    my: 2,
                                    display: "flex",
                                    ml:4,
                                    fontSize: 20,
                                    bgcolor: "black",
                                    fontWeight: 600,
                                    mx: 2,
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
                                        display: "flex",
                                        ml:4,
                                        fontSize: 20,
                                        bgcolor: "black",
                                        fontWeight: 600,
                                        mx: 2,
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
            </Container>
        </Container>
    )
};

    /* <div className={styles.detailsBackground} key={animal?.id}>
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
                </div> */
/*               <div>
                    
                    <img alt={animal?.name} className={styles.mainImg} src={animal?.main_image} />
                </div> 
                <div className={styles.infoContainer}>
                    <h1 className={styles.name}>{`${animal?.name}`}</h1>
                    <h2 className={styles.info}>Size: {`${animal?.size}`} Sex: {`${animal?.sex}`}</h2>
                    <h2 className={styles.info}>{`${animal?.description}`}</h2>
                    <h2 className={styles.info}>{`Age: ${animal?.age}`}</h2>
                    {
                        !user ? 
                        <div>
                        <Button
                            sx={{
                                my: 2,
                                display: "flex",
                                ml:4,
                                fontSize: 20,
                                bgcolor: "black",
                                fontWeight: 600,
                                mx: 2,
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
                            variant="outlined">
                                ADOPT ME! 💓
                        </Button>
                        </div> :
                        <Link to={`/home/animals/${animal?.id}/adoption`}>
                        <Button
                            sx={{
                                my: 2,
                                display: "flex",
                                ml:4,
                                fontSize: 20,
                                bgcolor: "black",
                                fontWeight: 600,
                                mx: 2,
                            }}
                            size="large"
                            variant="outlined">
                                ADOPT ME! 💓
                        </Button>
                    </Link>
                    } 
                </div>
            </div> 
*/