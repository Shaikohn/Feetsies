import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductName } from "../../../redux/actions/getProductsA.js";
import { resetPagination } from "../../../redux/actions/paginadoA.js";
import lupa from "./Img/Lupa.png";
//import "./SearchBarProd.module.css";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
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
      dispatch(getProductName(name));
      dispatch(resetPagination({ current: 1 }));
      setName("");
    } else {
      alert("Enter a name of product");
    }
  }

  return (
    // <div>
    //   <input
    //     type="text"
    //     placeholder="Search..."
    //     autoComplete="off"
    //     value={name}
    //     onChange={(e) => handlerInputChange(e)}
    //     onKeyDown={(e) => e.key === "Enter" && handlerSubmit(e)}
    //   />
    //   <button type="submit" onClick={(e) => handlerSubmit(e)}>
    //     <img src={lupa} alt="" weight="16px" height="16px" />
    //   </button>
    // </div>

    <>
      {/* <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            inputProps={{ "aria-label": "search" }}
            type="text"
            placeholder="Search…"
            autoComplete="off"
            value={name}
            onChange={(e) => handlerInputChange(e)}
            onKeyDown={(e) => e.key === "Enter" && handlerSubmit(e)}
          />
        </Search>
      </Toolbar> */}
      {/* <button type="submit" onClick={(e) => handlerSubmit(e)}>
        Search
      </button> */}
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <form onSubmit={handlerSubmit}>
            <StyledInputBase
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
      </Toolbar>
    </>
  );
}
