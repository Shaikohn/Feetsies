import ProductCard from "../../Features/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../redux/actions/getProductsA";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import NavBarProd from "../../Features/NavBarProducts/navBarP.jsx";
import Pagination from "../../Features/Paginado/Paginado.jsx";
import loading from "./Img/Loading.gif";
import Image from "./Img/BgImg3.jpg";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2"
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


export default function ProductHome() {
  const dispatch = useDispatch();

  const { allProductsCopy } = useSelector((state) => state.products);
  const { page } = useSelector((state) => state.currentPage);

  const [productsPerPage, setProductsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(page);
  const [search, setSearch] = useState('')
  const lastPositionPerPage = productsPerPage * currentPage;
  const firstPositionPerPage = lastPositionPerPage - productsPerPage;
  const currentProducts = allProductsCopy.slice(
    firstPositionPerPage,
    lastPositionPerPage
  );
  const filteredPage = allProductsCopy.filter(d => d.name.includes(search)).length

  useEffect(() => {
    if (allProductsCopy.length === 0) {
      dispatch(getAllProducts());
    }
    setCurrentPage(page);
  }, [dispatch, page, allProductsCopy.length]);

  function filteredProducts() {
    if(search === '') {
        return currentProducts
    } 
    const filtered = allProductsCopy.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
    if(filtered.length < 1) {
      Swal.fire({
        title: "NOT FOUND",
        icon: "error",
        text: 'Sorry, we couldnt find that product',
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
  setCurrentPage(page);
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
      }}
    >
      <ResponsiveAppBar />
      <Search sx={{
        marginBottom: '-65px',
        marginLeft: "70px",
        marginRight: "50px",
        marginTop: "22px",
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
          value={search}
          onChange={handleOnSearch}
        />
    </Search>
      <NavBarProd />
      <Pagination
        items={filteredPage}
        itemsPerPage={productsPerPage}
      />
      {filteredProducts().length ? (
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
          {filteredProducts().map((p) => {
            return (
              <Grid display="flex" key={p.id} item xs={3}>
                <Container sx={{ p: 0 }}>
                  <ProductCard
                    id={p.id}
                    key={p.id}
                    name={p.name}
                    image={p.image}
                    price={p.price}
                    productTypes={p.productTypes}
                    avg={p.avg}
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
      <Pagination
        items={filteredPage}
        itemsPerPage={productsPerPage}
      />
    </Paper>
  );
}
