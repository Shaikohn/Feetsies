import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import { Typography, Box, Container, IconButton, Collapse, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useStyles from "./Styles/styles.js";
import Mission from "./Images/Mission1.png";
import Vision from "./Images/Vision.png";
import Values from "./Images/Values.png";
import Adopt from "./Images/Adopt.png";
import Charity from "./Images/Charity.png";


export default function Landing() {

    const classes = useStyles();

    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, [])

    return (      
        <div>
            <ResponsiveAppBar />
            <div className={classes.bgContainer}>
                <Container>
                    <Collapse
                        in={checked}
                        {...(checked ? { timeout: 1000} : {})}
                        collapseHeight={50}
                        sx={{ml: -11}}
                    >
                        <Box className={classes.titleBox}>
                            <Typography variant="h2">
                                Welcome to <span className={classes.spanStyle}>FEETSIES</span>, your local animal shelter. Here, lost pets get to live and have a nice time while we look to get them a nice family to live with.
                            </Typography>
                        </Box>
                        <IconButton href="#box-info" behavior="smooth">
                            <ExpandMoreIcon className={classes.goDown} sx={{ width: 70, height: 70 }}/>
                        </IconButton>
                    </Collapse>
                </Container>
                <Box className={classes.boxContainer} id="box-info">

                    <Grid container spacing={3} className={classes.gridContainer}>
                        <Grid item xs={9} md={8}>
                            <Typography variant="h3" fontWeight={700} className={classes.subtitle}>
                                Our Mission
                            </Typography>
                            <Typography variant="h6" className={classes.subText}>
                                We care about animal rights and safety, just as you do. It is our mission to take care of lost animals and pets that are in unhealthy situations, or that can't live in their current home anymore. Our main goal is to get them a nice, loving home, where they can thrive and have a good life. 
                            </Typography>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <img src={Mission} alt="Mission" className={classes.largeImage} height="230px" width="120px"/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} className={classes.gridContainer}>
                        <Grid item xs={3} md={3}>
                            <img src={Vision} alt="Vision" className={classes.largeImage} height="210px" width="100px"/>
                        </Grid>
                        <Grid item xs={9} md={8}>
                            <Typography variant="h3" fontWeight={700} className={classes.subtitle}>
                                Vision
                            </Typography>
                            <Typography variant="h6" className={classes.subText}>
                                We aim to be the biggest and most important domestic animal shelter in our community, because helping our furry/feathery/scaly friends is what drives our motivation to grow. 
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} className={classes.gridContainer}>
                        <Grid item xs={9} md={8}>
                            <Typography variant="h3" fontWeight={700} className={classes.subtitle}>
                                Values
                            </Typography>
                            <Typography variant="h6" className={classes.subText}>
                                Love, comprehension and service for our pets are the three main pillars on which we build our confidence and passion for what we do.
                            </Typography>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <img src={Values} alt="Values" className={classes.largeImage} height="220px" width="100px"/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} className={classes.gridContainer}>
                        <Grid item xs={3} md={3}>
                            <img src={Adopt} alt="Adoption" className={classes.largeImage} height="140px" width="130px"/>
                        </Grid>
                        <Grid item xs={9} md={8}>
                            <Typography variant="h3" fontWeight={700} className={classes.subtitle}>
                                Adoptions
                            </Typography>
                            <Typography variant="h6" className={classes.subText}>
                                Our sweet, loving pets are waiting for you to take them home! If you are interested in adopting any of our available pets, get in touch with us and we can arrange a meeting, so you can give them the home they were waiting for for so long!
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} className={classes.gridContainer}>
                        <Grid item xs={9} md={8}>
                            <Typography variant="h3" fontWeight={700} className={classes.subtitle}>
                                Support
                            </Typography>
                            <Typography variant="h6" className={classes.subText}>
                                We are an NGO committed to the health and safety of our local pets. As such, funding is always a tricky issue. You can support us by making donations, or even better, buying some of our products, made by animal specialists, and approved by our pets!
                            </Typography>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <img src={Charity} alt="Charity" className={classes.largeImage} height="190px" width="130px"/>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    )
};