import ProductCard from "../../Features/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../redux/actions/getProductsA";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import NavBarProd from "../../Features/NavBarProducts/navBarP.jsx";
import Pagination from "../../Features/Paginado/Paginado.jsx";
import loading from "./Img/Loading.gif";
import styles from "./ProductHome.module.css";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

export default function ProductHome() {
  const dispatch = useDispatch();
  const { allProductsCopy } = useSelector((state) => state.products);
  const { page } = useSelector((state) => state.currentPage);

  const [productsPerPage] = useState(8);
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
  }, [dispatch, page, allProductsCopy.length]);

  return (
    <div>
      <div>
        <ResponsiveAppBar />
      </div>
      <div>
        <NavBarProd />
      </div>
      <div className="div-pagination">
        <Pagination
          items={allProductsCopy.length}
          itemsPerPage={productsPerPage}
        />
      </div>
      {/* <Container maxWidth="lg"> */}
      {currentProducts.length ? (
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          className={styles.bodyImg}
        >
          {currentProducts.map((p) => {
            return (
              <Grid item xs={3} key={p.id}>
                <Container>
                  <ProductCard
                    id={p.id}
                    key={p.id}
                    name={p.name}
                    image={p.image}
                    price={p.price}
                    productTypes={p.productTypes}
                  />
                </Container>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div>
          <img className={styles.loading} src={loading} alt="Loading..." />
        </div>
      )}
      {/* </Container> */}
    </div>
  );
}
