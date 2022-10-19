import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "./Img/backgroundDetails1.jpg";

import { RMIUploader } from "react-multiple-image-uploader";

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

const CreateProduct = () => {
  // NUEVA LIBRERIA

  const [dataSources, setDataSources] = useState([]);
  const [imgToUse, setImgToUse] = useState([]);

  const [visible, setVisible] = useState(false);
  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    console.log("Upload files", data);
    setDataSources(data);
  };
  const onSelect = (data) => {
    console.log("Select files", data);
    setImgToUse(data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
  };

  console.log("nuevas imagenes", dataSources);

  console.log("imagenes a subir", imgToUse);

  // modal material-ui
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        imgToUse,
      });
      Swal.fire({
        title: "Success",
        text: "Product Created",
        icon: "success",
        timer: 5000,
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
            <Button onClick={handleOpen}>Upload Images</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <RMIUploader
                  isOpen={visible}
                  hideModal={hideModal}
                  onSelect={onSelect}
                  onUpload={onUpload}
                  onRemove={onRemove}
                  dataSources={dataSources}
                />
              </Box>
            </Modal>
            {imgToUse.map((imageSrc) => (
              <img src={imageSrc.dataURL} alt="not fount" width={"250px"} />
            ))}
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
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
                          required: "A price is required"
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
                          The price can not be more than 1000
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

export default CreateProduct;
