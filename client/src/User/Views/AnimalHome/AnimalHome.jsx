import AnimalCard from "../../Features/AnimalCard/AnimalCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllAnimals } from "../../../redux/actions/getAnimalsA";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import NavBarAnimals from "../../Features/NavBarAnimal/NavBarAni.jsx";
import Pagination from "../../Features/Paginado/Paginado.jsx";
import loading from "./Img/Loading.gif";
import Image from "./Img/BgImg3.jpg";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { CardMedia, Paper } from "@mui/material";

export default function AnimalHome() {
  const dispatch = useDispatch();

  const { allAnimalsCopy } = useSelector((state) => state.animals);
  const { page } = useSelector((state) => state.currentPage);

  const [animalsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(page);

  const lastPositionPerPage = animalsPerPage * currentPage;
  const firstPositionPerPage = lastPositionPerPage - animalsPerPage;
  const currentAnimals = allAnimalsCopy.slice(
    firstPositionPerPage,
    lastPositionPerPage
  );

  useEffect(() => {
    if (allAnimalsCopy.length === 0) {
      dispatch(getAllAnimals());
    }
    setCurrentPage(page);
  }, [dispatch, page, allAnimalsCopy.length]);

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0.8, 0, 0)),url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%",
        minHeight: "100vh"
      }}
    >
      <ResponsiveAppBar />
      <NavBarAnimals />
      <Pagination items={allAnimalsCopy.length} itemsPerPage={animalsPerPage} />
      {currentAnimals.length ? (
        <Grid
          container
          spacing={2}
          rowSpacing={5}
          justifyContent="space-around"
          alignItems="center"
          sx={{
            my: 3,
            "& .MuiGrid-root": {
              py: 2.2,
              pl: 1.8,
              pr: 0,
            },
          }}
        >
          {currentAnimals.map((a) => {
            return (
              <Grid display="flex" key={a.id} item xs={3}>
                <Container sx={{ p: 0 }}>
                  <AnimalCard
                    id={a.id}
                    key={a.id}
                    name={a.name}
                    main_image={a.main_image}
                    sex={a.sex}
                    size={a.size}
                  />
                </Container>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <CardMedia
          component="img"
          image={loading}
          alt="Loading..."
          sx={{
            backgroundRepeat: "repeat",
            margin: "auto",
            width: "100%",
            height: "100%",
          }}
        />
      )}
      <Pagination items={allAnimalsCopy.length} itemsPerPage={animalsPerPage} />
    </Paper>
  );
}
