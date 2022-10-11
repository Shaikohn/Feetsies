import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllAnimals } from "../../../redux/actions/getAnimalsA.js";
import filterSexAnimals from "../../../redux/actions/filterSexAnimals.js";
import filterSizeAnimals from "../../../redux/actions/filterSizeAnimals.js";
import { setPage } from "../../../redux/actions/paginadoA.js";
import SearchBarAnim from "../SearchBarAnim/SearchBarAnim.jsx";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

const Filter = styled("div")(({ theme }) => ({
  width: "60px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "25px",
  border: "2px solid #567900",
  backgroundColor: "#fedf6a",
  borderRadius: "5px",
}));

function NavBarAnimals() {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    size: [],
    sex: [],
  });

  const arraySize = ["Small", "Medium", "Large"];
  const arraySex = ["Male", "Female"];

  const eventHandlerSize = (e) => {
    e.preventDefault();
    if (filters.size.length === 0) {
      setFilters({
        ...filters,
        size: [e.target.value],
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
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: 1,
          p: 1,
          borderRadius: 10,
        }}
        bgcolor="#ffff9b"
      >
        <SearchBarAnim />
        <Divider orientation="vertical" flexItem />
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
        <Divider orientation="vertical" flexItem />
        {arraySex.map((elem, id) => {
          return (
            <div key={id}>
              <Button
                variant="contained"
                value={elem}
                onClick={(e) => eventHandlerSex(e)}
                sx={{ bgcolor: "primary.dark" }}
              >
                {elem}
              </Button>
            </div>
          );
        })}
        <Divider orientation="vertical" flexItem />
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
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        {filters.size.length > 0 && <Filter>{filters.size}</Filter>}
        {filters.sex.length > 0 && <Filter>{filters.sex}</Filter>}
      </Stack>
    </>
  );
}

export default NavBarAnimals;
