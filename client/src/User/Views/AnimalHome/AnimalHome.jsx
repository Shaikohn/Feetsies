import AnimalCard from "../../Features/AnimalCard/AnimalCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllAnimals } from "../../../redux/actions/getAnimalsA";
import Header from "../../Features/Header/Header.jsx";
import NavBarAnimals from "../../Features/NavBarAnimal/NavBarAni.jsx";
import Pagination from "../../Features/Paginado/Paginado.jsx";
import loading from "./Img/Loading.gif";
import styles from "./AnimalHome.module.css";

export default function AnimalHome() {
  const dispatch = useDispatch();
  const { allAnimalsCopy } = useSelector((state) => state.animals);
  const {page} = useSelector((state) => state.currentPage);

  const [animalsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(page);
  const lastPositionPerPage = animalsPerPage * currentPage;
  const firstPositionPerPage = lastPositionPerPage - animalsPerPage;
  const currentAnimals = allAnimalsCopy.slice(
    firstPositionPerPage,
    lastPositionPerPage
  );

  useEffect(() => {
    dispatch(getAllAnimals());
    setCurrentPage(page)
  }, [dispatch,page]);

  return (
    <div>
      <div className={styles.headerAnim}>
        <Header />
      </div>
      <div className="divanim-navbar">
        <NavBarAnimals />
      </div>
      <div className="div-pagination">
        <Pagination
        items={allAnimalsCopy.length}
        itemsPerPage={animalsPerPage} />
      </div>
      {currentAnimals.length ? (
        <div className={styles.bodyAnim}>
          {currentAnimals.map((a) => {
            return (
              <AnimalCard
                id={a.id}
                name={a.name}
                main_image={a.main_image}
                sex={a.sex}
                size={a.size}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <img className={styles.loading} src={loading} alt="Loading..." />
        </div>
      )}
    </div>
  );
}
