import React, { useEffect, useReducer } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import { useDispatch, useSelector } from "react-redux";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import IconButton from "@mui/material/IconButton";
import { getAllProducts } from "../../redux/actions/getProductsA";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const ProductTable = () => {
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const { allProductsCopy } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [reducerValue, dispatch]);
  console.log(allProductsCopy);

  //   const handleDelete = (e, id) => {
  //     e.preventDefault();
  //     dispatch(updateUserAdmin(id));
  //     forceUpdate();
  //   };

  //   const handleUpdate = (e, id) => {
  //     e.preventDefault();
  //     dispatch(updateUserBan(id));
  //     forceUpdate();
  //   };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allProductsCopy.map((products) => (
            <TableRow
              key={products.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {products.id}
              </TableCell>
              <TableCell>{products.name}</TableCell>
              <TableCell>{products.stock}</TableCell>
              <TableCell>{products.price}</TableCell>
              <TableCell>{products.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
