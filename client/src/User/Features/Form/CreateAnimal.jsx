import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import styles from "./CreateProduct.module.css";
import { useDispatch } from "react-redux";
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

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAllAnimals } from "../../../redux/actions/getAnimalsA.js";
import { useNavigate } from "react-router-dom";

// const dataSources = [
//   {
//     id: 1,
//     dataURL: "https://picsum.photos/seed/1/600",
//   },
//   {
//     id: 2,
//     dataURL: "https://picsum.photos/seed/2/600",
//   },
//   {
//     id: 3,
//     dataURL: "https://picsum.photos/seed/3/600",
//   },
//   {
//     id: 4,
//     dataURL: "https://picsum.photos/seed/4/600",
//   },
//   {
//     id: 5,
//     dataURL: "https://picsum.photos/seed/5/600",
//   },
//   {
//     id: 6,
//     dataURL: "https://picsum.photos/seed/6/600",
//   },
//   {
//     id: 7,
//     dataURL: "https://picsum.photos/seed/7/600",
//   },
//   {
//     id: 8,
//     dataURL: "https://picsum.photos/seed/8/600",
//   },
//   {
//     id: 9,
//     dataURL: "https://picsum.photos/seed/9/600",
//   },
//   {
//     id: 10,
//     dataURL: "https://picsum.photos/seed/10/600",
//   },
// ];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateAnimal = () => {
  const navigate = useNavigate();
  // **** cloudinary ****
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageChosen, setImageChosen] = useState(false);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "proyecto-final-animals");
    setImageChosen(true);
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/tawaynaskp/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setImage(file.secure_url);
    setLoading(false);
  };

  const dispatch = useDispatch();

  const {
    register,
    formState,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      sex: "",
      size: "",
      breed: "",
      age: "",
      types: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      await axios.post("/animals", {
        ...data,
        image,
      });
      Swal.fire({
        title: "SUCCESS",
        text: "Animal Created!",
        icon: "success",
        timer: 2000,
      });
      dispatch(getAllAnimals());
      navigate("/dashboard/animaltable");
    } catch (error) {
      Swal.fire({
        title: "ANIMAL NOT CREATED",
        text: "Sorry, something failed",
        icon: "error",
        timer: 2000,
      });
      console.log(error);
    }
  };

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
    <div>
      <div>
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
            <Card sx={{ padding: "20px 5px", margin: "0 auto" }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Animal Form
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <TextField
                        error={errors.name ? true : false}
                        label="Animal´s name"
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
                      {/* <TextField
                        error={errors.sex ? true : false}
                        label="Sex"
                        variant="outlined"
                        type="number"
                        fullWidth
                        {...register("sex", {
                          required: "Please type a number",
                          max: 1000,
                        })}
                        aria-invalid={errors.sex ? "true" : "false"}
                      />
                      {errors?.sex?.type === "required" && (
                        <span style={{ color: "red" }}>
                          {errors.sex?.message}
                        </span>
                      )}
                      {errors?.sex?.type === "max" && (
                        <span style={{ color: "red" }}>
                          the stock can not be more than 1000
                        </span>
                      )} */}

                      <FormControl name="sex" fullWidth {...register("sex")}>
                        <InputLabel name="sex" id="demo-simple-select-label">
                          Sex
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={sex}
                          label="Sex"
                          onChange={handleChangeSex}
                          name="sex"
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.breed ? true : false}
                        type="text"
                        label="Breed"
                        variant="outlined"
                        fullWidth
                        {...register("breed", {
                          required: "A price is required",
                          max: 1000,
                        })}
                        aria-invalid={errors.breed ? "true" : "false"}
                      />
                      {errors?.breed?.type === "required" && (
                        <span style={{ color: "red" }}>
                          {errors.breed?.message}
                        </span>
                      )}
                      {errors?.breed?.type === "max" && (
                        <span style={{ color: "red" }}>
                          The price can not be more than 1000
                        </span>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      {/* <TextField
                        error={errors.size ? true : false}
                        type="number"
                        label="Size"
                        variant="outlined"
                        fullWidth
                        {...register("size", {
                          required: "A size is required",
                          max: 1000,
                        })}
                        aria-invalid={errors.size ? "true" : "false"}
                      />
                      {errors?.size?.type === "required" && (
                        <span style={{ color: "red" }}>
                          {errors.size?.message}
                        </span>
                      )}
                      {errors?.size?.type === "max" && (
                        <span style={{ color: "red" }}>
                          The price can not be more than 1000
                        </span>
                      )} */}
                      <FormControl fullWidth name="size" {...register("size")}>
                        <InputLabel name="size" id="demo-simple-select-label">
                          Size
                        </InputLabel>
                        <Select
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
                      {/* <TextField
                        error={errors.type ? true : false}
                        type="number"
                        label="Type"
                        variant="outlined"
                        fullWidth
                        {...register("type", {
                          required: "A type is required",
                          max: 1000,
                        })}
                        aria-invalid={errors.type ? "true" : "false"}
                      />
                      {errors?.type?.type === "required" && (
                        <span style={{ color: "red" }}>
                          {errors.type?.message}
                        </span>
                      )}
                      {errors?.type?.type === "max" && (
                        <span style={{ color: "red" }}>
                          The price can not be more than 1000
                        </span>
                      )} */}

                      <FormControl
                        name="types"
                        fullWidth
                        {...register("types")}
                      >
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
                        placeholder="Type your message here"
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
                      {/* <TextField
                        sx={{
                          bgcolor: "#fff ",
                          color: "#FFC400",
                          borderRadius: "10px",
                        }}
                        id="input-with-icon-textfield"
                        label="Animal Foto"
                        name="image"
                        InputProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        {...register("image")}
                      /> */}

                      <input
                        type="file"
                        name="file"
                        onChange={uploadImage}
                      ></input>

                      {imageChosen &&
                        (!loading ? (
                          <img
                            src={image}
                            style={{ width: "50%" }}
                            alt="animal img"
                          />
                        ) : (
                          <p>Wait a few moment</p>
                        ))}
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Create
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CreateAnimal;
