import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllAnimals } from "../../../redux/actions/getAnimalsA.js";
import filterSexAnimals from "../../../redux/actions/filterSexAnimals.js";
import filterSizeAnimals from "../../../redux/actions/filterSizeAnimals.js";
import { setPage } from "../../../redux/actions/paginadoA.js";
import SearchBarAnim from "../SearchBarAnim/SearchBarAnim.jsx";
import "./NavBarAnimal.css";

import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";

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
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          borderRadius: 1,
        }}
      >
        <SearchBarAnim />
        {arraySize.map((ele, id) => {
          return (
            <div key={id}>
              <Button
                variant="contained"
                value={ele}
                onClick={(e) => eventHandlerSize(e)}
              >
                {ele}
              </Button>
            </div>
          );
        })}
        {arraySex.map((elem, id) => {
          return (
            <div key={id}>
              {/* <button value={elem} onClick={(e) => eventHandlerSex(e)}>
              {elem}
            </button> */}
              <Button
                variant="text"
                value={elem}
                onClick={(e) => eventHandlerSex(e)}
              >
                {elem}
              </Button>
            </div>
          );
        })}
        <Button
          variant="contained"
          onClick={(e) => clearFilters(e)}
          color="success"
        >
          Clear filters
        </Button>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          borderRadius: 1,
        }}
      >
        {filters.size.length > 0 && <div>{filters.size}</div>}
        {filters.sex.length > 0 && <div>{filters.sex}</div>}
      </Stack>
    </>
  );
}

export default NavBarAnimals;
