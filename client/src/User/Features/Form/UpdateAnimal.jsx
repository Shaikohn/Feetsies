import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions/getProductsA.js";
import Swal from "sweetalert2";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import {
  clearAnimalDetails,
  getAnimalDetails,
} from "../../../redux/actions/animalDetailsActions.js";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAllAnimals } from "../../../redux/actions/getAnimalsA.js";

const UpdateAnimal = () => {
  const navigate = useNavigate();
  const {
    register,
    formState,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const { animalDetails } = useSelector((state) => state.AnimalDetails);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAnimalDetails(id));
    return () => {
      dispatch(clearAnimalDetails());
    };
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/animals/${id}`, {
        name: data.name,
        sex: data.sex,
        breed: data.breed,
        size: data.size,
        age: data.age,
        types: data.types,
        description: data.description,
      });
      Swal.fire({
        title: "SUCESS",
        text: "Animal Updated!",
        icon: "success",
        timer: 2000,
      });
      dispatch(getAllAnimals());
      navigate("/dashboard/animaltable");
    } catch (error) {
      Swal.fire({
        title: "ANIMAL NOT UPDATED",
        text: "Sorry, something failed",
        icon: "error",
        timer: 2000,
      });
      console.log(error);
    }
  };
  console.log(errors);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: "", description: "", stock: "", price: "", image: "" });
    }
  }, [formState, reset]);

  //   Selects
  const [size, setSize] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [types, setTypes] = React.useState("");

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const handleChangeSex = (event) => {
    setSex(event.target.value);
  };

  const handleChangeTypes = (event) => {
    setTypes(event.target.value);
  };

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          my: 4,
          mx: 2,
          // backgroundImage: `url(${Image})`,
          height: "90vh",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={6}>
          {/* {productDetails?.productImages?.map((img) => (
            <img src={img.image} alt="not fount" width={"250px"} />
          ))} */}
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Update Animal
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <label>Name</label>
                    <TextField
                      error={errors.name ? true : false}
                      type="text"
                      multiline
                      defaultValue={animalDetails.name}
                      variant="outlined"
                      fullWidth
                      {...register("name", {
                        required: true,
                        pattern: /^[a-zA-Z ]*$/i,
                        maxLength: 20,
                      })}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors?.name?.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                    {errors?.name?.type === "maxLength" && (
                      <span style={{ color: "red" }}>
                        Product's name cannot exceed 20 characters
                      </span>
                    )}
                    {errors?.name?.type === "pattern" && (
                      <span style={{ color: "red" }}>
                        Alphabetical characters only
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sex}
                        label="Sex"
                        onChange={handleChangeSex}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Breed"
                      multiline
                      defaultValue={animalDetails.breed}
                      variant="outlined"
                      fullWidth
                      {...register("breed", {
                        required: "A price is required",
                        max: 1000,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth name="size" {...register("size")}>
                      <InputLabel name="size" id="demo-simple-select-label">
                        Size
                      </InputLabel>
                      <Select
                        // defaultValue={animalDetails.}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={size}
                        label="Size"
                        onChange={handleChangeSize}
                        name="size"
                      >
                        <MenuItem value="Small">Small</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Large">Large</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errors.age ? true : false}
                      type="number"
                      label="Age"
                      variant="outlined"
                      defaultValue={animalDetails.age}
                      multiline
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                      fullWidth
                      {...register("age", {
                        required: "A age is required",
                        max: 1000,
                      })}
                      aria-invalid={errors.age ? "true" : "false"}
                    />
                    {errors?.age?.type === "required" && (
                      <span style={{ color: "red" }}>
                        {errors.age?.message}
                      </span>
                    )}
                    {errors?.age?.type === "max" && (
                      <span style={{ color: "red" }}>
                        The price can not be more than 1000
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl name="types" fullWidth {...register("types")}>
                      <InputLabel name="types" id="demo-simple-select-label">
                        Types
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={types}
                        label="Types"
                        onChange={handleChangeTypes}
                        name="types"
                      >
                        <MenuItem value="Cat">Cat</MenuItem>
                        <MenuItem value="Dog">Dog</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errors.description ? true : false}
                      label="Description"
                      multiline
                      rows={4}
                      defaultValue={animalDetails.description}
                      variant="outlined"
                      fullWidth
                      {...register("description", {
                        required: true,
                        maxLength: 120,
                      })}
                      aria-invalid={errors.description ? "true" : "false"}
                    />
                    {errors?.description?.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                    {errors?.description?.type === "maxLength" && (
                      <span style={{ color: "red" }}>
                        Description cannot exceed 120 characters
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UpdateAnimal;
