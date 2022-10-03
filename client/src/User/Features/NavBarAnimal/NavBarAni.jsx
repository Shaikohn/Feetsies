import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllAnimals } from "../../../redux/actions/getAnimalsA.js";
import filterSexAnimals from "../../../redux/actions/filterSexAnimals.js";
import filterSizeAnimals from "../../../redux/actions/filterSizeAnimals.js";
import { setPage } from "../../../redux/actions/paginadoA.js";
import SearchBarAnim from "../SearchBarAnim/SearchBarAnim.jsx";
import "./NavBarAnimal.css";

function NavBarAnimals() {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    size: [],
    sex: [],
  });
  console.log(filters);

  const eventHandlerSize = (e) => {
    e.preventDefault();
    if (filters.size.length === 0) {
      setFilters({
        ...filters,
        size: [...e.target.value],
      });
      dispatch(filterSizeAnimals(e.target.value));
      dispatch(setPage(1));
    }
  };
  const eventHandlerSex = (e) => {
    e.preventDefault();
    if (filters.sex.length === 0) {
      setFilters({
        ...filters,
        sex: [...e.target.value],
      });
      dispatch(filterSexAnimals(e.target.value));
      dispatch(setPage(1));
    }
  };

  const arraySize = ["Small", "Medium", "Large"];
  const arraySex = ["Male", "Female"];

  const clearFilters = (e) => {
    e.preventDefault();
    dispatch(getAllAnimals());
    dispatch(setPage(1));
    setFilters({
      sex: [],
      size: [],
    });
  };

  return (
    <div className="container-navBar">
      <div>
        <SearchBarAnim />
      </div>
      {arraySize.map((ele, id) => {
        return (
          <div key={id}>
            <button
              className="size-btn"
              value={ele}
              onClick={(e) => eventHandlerSize(e)}
            >
              {ele}
            </button>
          </div>
        );
      })}
      {arraySex.map((elem, id) => {
        return (
          <div key={id}>
            <button
              className="sex-btn"
              value={elem}
              onClick={(e) => eventHandlerSex(e)}
            >
              {elem}
            </button>
          </div>
        );
      })}
      <div>
        <button className="clear-btn" onClick={(e) => clearFilters(e)}>
          Clear filters
        </button>
      </div>
  
      <div className="container-filter">{filters.size.length > 0 && <div>{filters.size}</div>}</div>
      <div className="container-filter">{filters.sex.length >0 && <div>{filters.sex}</div>}</div>
      
     
    </div>
  );
}

export default NavBarAnimals;
