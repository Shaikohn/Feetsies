import AnimalCard from "../../Features/AnimalCard/AnimalCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllAnimals } from "../../../redux/actions/getAnimalsA";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import NavBarAnimals from "../../Features/NavBarAnimal/NavBarAni.jsx";
import Pagination from "../../Features/Paginado/Paginado.jsx";
import loading from "./Img/Loading.gif";
import Image from "./Img/BgImg3.jpg";
import Swal from 'sweetalert2'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { CardMedia, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const Search = styled("div")(({ theme }) => ({
  width: "260px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: "45px",
  border: "1px solid #bada59",
  backgroundColor: "#ffff9b",
  borderRadius: "20px",
  "&:hover": {
    border: "2px solid #567900",
    backgroundColor: "#c8ad39"
  },
}));


export default function AnimalHome() {

  const dispatch = useDispatch();

  const { allAnimalsCopy } = useSelector((state) => state.animals);
  const { page, search } = useSelector((state) => state.currentPage);
  const [newSearch, setSearch] = useState(search)
  const [animalsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(page);
  const lastPositionPerPage = animalsPerPage * currentPage;
  const firstPositionPerPage = lastPositionPerPage - animalsPerPage;
  const currentAnimals = allAnimalsCopy.slice(
    firstPositionPerPage,
    lastPositionPerPage
  );
  const filteredPage = allAnimalsCopy.filter(d => d.name.includes(newSearch)).length
  console.log(filteredPage)


  console.log(allAnimalsCopy)

  useEffect(() => {
    if (allAnimalsCopy.length === 0) {
      dispatch(getAllAnimals());
    }
    setSearch(search)
    setCurrentPage(page);
  }, [dispatch, page, allAnimalsCopy.length, search]);

  function filteredAnimals() {
    if(newSearch === '') {
        return currentAnimals
    } 
    const filtered = allAnimalsCopy.filter(d => d.name.toLowerCase().includes(newSearch.toLowerCase()))
    
    if(filtered.length < 1) {
      Swal.fire({
        title: "NOT FOUND",
        icon: "error",
        text: 'Sorry, we couldnt find that animal',
        confirmButtonText: "Clean search",
        confirmButtonColor: "green",
      }).then((res) => {
        if (res.isConfirmed) {
          setSearch('');
        }
      });
    } 
    console.log("filtered", filtered)
    return filtered.slice(firstPositionPerPage,
      lastPositionPerPage)
}

function handleOnSearch(e) {
  setSearch(e.target.value)
}

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
      <Search sx={{
        marginBottom: '-59px',
        marginLeft: "20px", 
        marginTop: "20px",
        zIndex: 1,
    }}>
      <IconButton sx={{ px: 1.3 }} color="primary">
        <SearchIcon  sx={{ width: 35, height: 35 }}/>
      </IconButton>
        <InputBase
          inputProps={{ "aria-label": "search" }}
          type="text"
          placeholder="Search…"
          autoComplete="off"
          value={newSearch}
          onChange={handleOnSearch}
        />
    </Search>
    <NavBarAnimals />
    <Pagination
        items={filteredPage}
        itemsPerPage={animalsPerPage}
      />
      {filteredAnimals().length ? (
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
              pr: 0
            }
          }}
        >
          {filteredAnimals().map((a) => {
            return (
              <Grid display="flex" key={a.id} item xs={3}>
                <Container sx={{p: 0}}>
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
        <CardMedia component="img" image={loading}  alt="Loading..." 
          sx={{
            backgroundRepeat: "repeat",
            margin: "auto",
            width: "100%",
            height: "100%"
          }}
        />
      )}
      <Pagination
        items={filteredPage}
        itemsPerPage={animalsPerPage}
      />
    </Paper>
  );
}
