import React, { useEffect, useReducer, useState } from "react";
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
import {
  getAllUsers,
  updateUserAdmin,
  updateUserBan,
} from "../../redux/actions/getAllUsers";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import IconButton from "@mui/material/IconButton";
import Swal from 'sweetalert2'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const UserTable = () => {
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const { allUsers } = useSelector((state) => state.users);
  const [userId, setUserId] = useState(
    JSON.parse(localStorage?.getItem("profile")).data.id
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [reducerValue, dispatch]);
  console.log(allUsers);

  const handleAdmin = (e, id) => {
    e.preventDefault();
    dispatch(updateUserAdmin(id));
    forceUpdate();
    if(userId === id) {
      Swal.fire({
        title: 'User not updated', 
        text: 'You cant change your role!', 
        icon: 'error',
        timer: 3000
      });
    } else {
      Swal.fire({
        title: 'User updated', 
        text: 'User role has been updated', 
        icon: 'success',
        timer: 3000
      });
    }
  };

  const handleBan = (e, id) => {
    e.preventDefault();
    dispatch(updateUserBan(id));
    forceUpdate();
    if(userId === id) {
      Swal.fire({
        title: 'User not updated', 
        text: 'You cant ban yourself!', 
        icon: 'error',
        timer: 3000
      });
    } else {
      Swal.fire({
        title: 'User updated', 
        text: 'User status has been updated', 
        icon: 'success',
        timer: 3000
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>Emails</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Ban</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((users) => (
            <TableRow
              key={users.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {users.name}
              </TableCell>
              <TableCell>{users.lastName}</TableCell>
              <TableCell>{users.email}</TableCell>
              <TableCell>{users.phone_number}</TableCell>
              <TableCell>
                {users.isAdmin ? (
                  <TableCell>
                    <IconButton onClick={(e) => handleAdmin(e, users.id)}>
                      <LocalPoliceIcon />
                    </IconButton>
                  </TableCell>
                ) : (
                  <TableCell>
                    <IconButton onClick={(e) => handleAdmin(e, users.id)}>
                      <AccountBoxIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableCell>
              <TableCell>
                {users.isBan ? (
                  <IconButton onClick={(e) => handleBan(e, users.id)}>
                    <TaskAltIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={(e) => handleBan(e, users.id)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
