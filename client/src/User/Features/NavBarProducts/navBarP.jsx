import { useState } from "react";
import { useDispatch } from "react-redux";
import orderProductPrice from "../../../redux/actions/orderPrice.js";
import orderProductName from "../../../redux/actions/orderName.js";
import filterTypeProducts from "../../../redux/actions/filterTypeProducts.js";
import { setPage } from "../../../redux/actions/paginadoA.js";
import SearchBarProd from "../SearchBarProd/SearchBarProd.jsx";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function NavBarProducts() {
  const dispatch = useDispatch();

  const [typeProduct, setTypeProduct] = useState("");
  const [orderPrice, setOrderPrice] = useState("");
  const [orderName, setOrderName] = useState("");

  const eventHandlerPrice = (e) => {
    e.preventDefault();
    setOrderPrice(e.target.value);
    dispatch(orderProductPrice(e.target.value));
    dispatch(setPage(1));
  };

  const eventHandlerName = (e) => {
    e.preventDefault();
    setOrderName(e.target.value);
    dispatch(orderProductName(e.target.value));
    dispatch(setPage(1));
  };

  const eventHandlerProductType = (e) => {
    e.preventDefault();
    setTypeProduct(e.target.value);
    dispatch(filterTypeProducts(e.target.value));
    dispatch(setPage(1));
  };

  return (
    <Stack
      direction="row"
      spacing={4}
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
      <SearchBarProd />
      <Box sx={{ width: 190, height: 57 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Filter type product
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeProduct}
            label="Filter type product"
            onChange={eventHandlerProductType}
          >
            <MenuItem value="All">All types</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Toy">Toys</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ width: 190, height: 57 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Order by price</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderPrice}
            label="Order by price"
            onChange={eventHandlerPrice}
          >
            <MenuItem value="asc">Low to high</MenuItem>
            <MenuItem value="desc">High to low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ width: 190, height: 57 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Order By Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderName}
            label="Order By Name"
            onChange={eventHandlerName}
          >
            <MenuItem value="asc">A to Z</MenuItem>
            <MenuItem value="desc">Z to A</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
}

export default NavBarProducts;
