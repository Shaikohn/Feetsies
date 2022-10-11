import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAnimalName } from "../../../redux/actions/getAnimalsA.js";
import { resetPagination } from "../../../redux/actions/paginadoA.js";

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


export default function SearchBarProd() {

  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handlerInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handlerSubmit(e) {
    e.preventDefault(e);
    if (name !== "") {
      dispatch(getAnimalName(name));
      dispatch(resetPagination({ current: 1 }));
      setName("");
    } else {
      alert("Enter a name of animal");
    }
  }

  return (
    <Search>
      <IconButton sx={{ px: 1.3 }} onClick={(e) => handlerSubmit(e)} color="primary">
        <SearchIcon  sx={{ width: 35, height: 35 }}/>
      </IconButton>
      <form onSubmit={handlerSubmit}>
        <InputBase
          inputProps={{ "aria-label": "search" }}
          type="text"
          placeholder="Search…"
          autoComplete="off"
          value={name}
          onChange={(e) => handlerInputChange(e)}
          onKeyDown={(e) => e.key === "Enter" && handlerSubmit(e)}
        />
      </form>
    </Search>
  );
}
