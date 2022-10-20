import ProductCard from "../../Features/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  clearProducts,
  getAllProducts,
} from "../../../redux/actions/getProductsA";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import NavBarProd from "../../Features/NavBarProducts/navBarP.jsx";
import Pagination from "../../Features/Paginado/Paginado.jsx";
import loading from "./Img/Loading.gif";
import Image from "./Img/BgImg3.jpg";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { CardMedia, Paper } from "@mui/material";

export default function ProductHome() {
  const dispatch = useDispatch();

  const { allProductsCopy } = useSelector((state) => state.products);
  const { page } = useSelector((state) => state.currentPage);

  const [productsPerPage, setProductsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(page);

  const lastPositionPerPage = productsPerPage * currentPage;
  const firstPositionPerPage = lastPositionPerPage - productsPerPage;
  const currentProducts = allProductsCopy.slice(
    firstPositionPerPage,
    lastPositionPerPage
  );

  useEffect(() => {
    if (allProductsCopy.length === 0) {
      dispatch(getAllProducts());
    }
    setCurrentPage(page);
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch, page, allProductsCopy.length]);

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
      <NavBarProd />
      <Pagination
        items={allProductsCopy.length}
        itemsPerPage={productsPerPage}
      />
      {currentProducts.length ? (
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
          {currentProducts.map((p) => {
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
                    stock={p.stock}
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
        items={allProductsCopy.length}
        itemsPerPage={productsPerPage}
      />
    </Paper>
  );
}
