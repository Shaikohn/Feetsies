import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import styles from "./CreateProduct.module.css";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../../redux/actions/getProductsA.js";
import Swal from 'sweetalert2'
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const CreateProduct = () => {
  const dispatch = useDispatch();
  // **** cloudinary ****
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "proyecto-final-animals");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/tawaynaskp/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    console.log("data", file);

    setImage(file.secure_url);
    setLoading(false);
  };

  console.log(image);

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
      stock: "",
      price: "",
      image: "",
    },
  });
  console.log(isSubmitSuccessful);
  const onSubmit = async (data) => {
    console.log("Onsubmit", { ...data, image });
    try {
      await axios.post("/products/create", {
        ...data,
        image,
      });
      Swal.fire({
        title: 'Success', 
        text: "Product Created", 
        icon: 'success',
        timer: 5000
    });
      setImage("");
      dispatch(getAllProducts());
    } catch (error) {
      console.log(error);
    }
  };
  console.log(errors);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: "", description: "", stock: "", price: "", image: "" });
    }
  }, [formState, reset, image]);

  return (
    <div>
      <div>
        <ResponsiveAppBar />
      </div>
      <div className={styles.createForm}>
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                Product form
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <TextField
                      error={errors.name ? true : false}
                      label="Product´s name"
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
                    <TextField
                      error={errors.stock ? true : false}
                      label="Stock"
                      variant="outlined"
                      type="number"
                      fullWidth
                      {...register("stock", {
                        required: "Please type a number",
                        max: 1000,
                      })}
                      aria-invalid={errors.stock ? "true" : "false"}
                    />
                    {errors?.stock?.type === "required" && (
                      <span style={{ color: "red" }}>
                        {errors.stock?.message}
                      </span>
                    )}
                    {errors?.stock?.type === "max" && (
                      <span style={{ color: "red" }}>
                        the stock can not be more than 1000
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errors.price ? true : false}
                      type="number"
                      label="Price"
                      variant="outlined"
                      fullWidth
                      {...register("price", {
                        required: "A price is required",
                        max: 1000,
                      })}
                      aria-invalid={errors.price ? "true" : "false"}
                    />
                    {errors?.price?.type === "required" && (
                      <span style={{ color: "red" }}>
                        {errors.price?.message}
                      </span>
                    )}
                    {errors?.price?.type === "max" && (
                      <span style={{ color: "red" }}>
                        the price can not be more than 1000
                      </span>
                    )}
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
                      rows={4}
                      fullWidth
                      label="Image"
                      type="file"
                      multiple
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("image")}
                      onChange={uploadImage}
                    /> */}
                    <Button variant="contained" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={uploadImage}
                      />
                    </Button>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input hidden accept="image/*" type="file" />
                      <PhotoCamera />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <img
                      src={
                        image
                          ? image
                          : "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg"
                      }
                      alt="not found"
                      width={200}
                    />
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
      </div>
    </div>
  );
};

export default CreateProduct;
