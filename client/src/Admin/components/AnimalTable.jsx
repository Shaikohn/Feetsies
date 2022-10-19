import Title from "./Title";
import {
  Avatar,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Table,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllAnimals } from "../../redux/actions/getAnimalsA";
import { Link, useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

export function AnimalCard({ animal }) {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        width: "fit-content",
        margin: "auto",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <Avatar
          variant="rounded"
          src={`${animal.main_image}`}
          sx={{
            margin: "auto",
            width: "70%",
            height: "100%",
            borderRadius: "20px",
          }}
        />
      </Box>
      <Stack spacing={0.5}>
        <Box>
          <Link to={`/home/animals/${animal.id}`}>
            <Typography fontWeight={700}>Name: {animal.name}</Typography>
          </Link>
          <Typography fontWeight={300}>Sex: {animal.sex}</Typography>
          <Typography fontWeight={300}>Breed: {animal.breed}</Typography>
          <Typography fontWeight={300}>Size: {animal.size}</Typography>
          <Typography fontWeight={300}>Age: {animal.age} years old </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export function AnimalsTable() {
  const navigate = useNavigate();
  let { allAnimals } = useSelector((state) => state.animals);
  let dispatch = useDispatch();

  React.useEffect(() => {
    if (allAnimals.length === 0) {
      dispatch(getAllAnimals());
    }
    console.log(allAnimals);
  }, [allAnimals]);

  async function handleDeleteAnimal(e, id) {
    e.preventDefault();
    try {
      await axios.delete(`/animals/${id}`);
      alert("Animal deleted");
      dispatch(getAllAnimals());
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditAnimal(e, id) {
    e.preventDefault();
    navigate(`/dashboard/updateAnimal/${id}`);
  }

  return (
    <React.Fragment>
      <Title>Animals</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Sex</TableCell>
            <TableCell align="center">Breed</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allAnimals?.map((p) => (
            <TableRow key={p.id}>
              <TableCell
                align="center"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Avatar src={p.main_image} />
              </TableCell>
              <TableCell align="center">
                <Link to={`/home/animals/${p.id}`}>{p.name}</Link>
              </TableCell>
              <TableCell align="center">{p.sex}</TableCell>
              <TableCell align="center">{p.breed}</TableCell>
              <TableCell align="center">{p.size}</TableCell>
              <TableCell align="center">{p.age} yrs</TableCell>
              {
                <TableCell align="center">
                  {p.animal_types.map((type, i) => {
                    return <p>{type.name}</p>;
                  })}
                </TableCell>
              }
              <TableCell align="center">
                <IconButton onClick={(e) => handleEditAnimal(e, p.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={(e) => handleDeleteAnimal(e, p.id)}>
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
