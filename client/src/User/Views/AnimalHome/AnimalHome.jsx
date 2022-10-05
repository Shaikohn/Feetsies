import AnimalCard from "../../Features/AnimalCard/AnimalCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllAnimals } from "../../../redux/actions/getAnimalsA";
import Header from "../../Features/Header/Header.jsx";
import NavBarAnimals from "../../Features/NavBarAnimal/NavBarAni.jsx";
import Pagination from "../../Features/Paginado/Paginado.jsx";
import loading from "./Img/Loading.gif";
import styles from "./AnimalHome.module.css";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

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
    <div>
      <div className={styles.headerAnim}>
        <Header />
      </div>
      <div>
        <NavBarAnimals />
      </div>
      <div className="div-pagination">
        <Pagination
          items={allAnimalsCopy.length}
          itemsPerPage={animalsPerPage}
        />
      </div>
      {/* <Container> */}
      {currentAnimals.length ? (
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          className={styles.bodyImg}
        >
          {currentAnimals.map((a) => {
            return (
              <Grid item xs={3} key={a.id}>
                <Container>
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
        <div>
          <img className={styles.loading} src={loading} alt="Loading..." />
        </div>
      )}
      {/* </Container> */}
    </div>
  );
}
