import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const CreateProduct = () => {
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
      await axios.post("http://localhost:3001/products/create", {
        ...data,
        image,
      });
      alert("Product Created");
      setImage("");
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
    <div className="App">
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
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
                    <span style={{ color: "red" }}>This field is required</span>
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
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                  {errors?.description?.type === "maxLength" && (
                    <span style={{ color: "red" }}>
                      Description cannot exceed 120 characters
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
                  />
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
  );
};

export default CreateProduct;
