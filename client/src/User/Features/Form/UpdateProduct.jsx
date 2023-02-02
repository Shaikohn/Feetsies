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
import {
  clearProductDetails,
  getProductDetails,
} from "../../../redux/actions/productDetailsActions";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { RMIUploader } from "react-multiple-image-uploader";
import { useNavigate, useParams } from "react-router-dom";

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

const UpdateProduct = () => {
  const navigate = useNavigate();
  const {
    register,
    formState,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.ProductDetails);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductDetails(id));
    return () => {
      dispatch(clearProductDetails());
    };
  }, []);

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
    setDataSources(data);
  };
  const onSelect = (data) => {
    setImgToUse(data);
  };
  const onRemove = (id) => {
  };

  // modal material-ui
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/products/update/${id}`, {
        ...data,
      });
      Swal.fire({
        title: "SUCESS",
        text: "Product Updated",
        icon: "success",
        timer: 2000,
      });
      dispatch(getAllProducts());
      navigate("/dashboard/products");
    } catch (error) {
      Swal.fire({
        title: "PRODUCT NOT UPDATED",
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
          {/* <Button onClick={handleOpen}>Update Images</Button>
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
          </Modal> */}
          {productDetails?.productImages?.map((img) => (
            <img src={img.image} alt="not fount" width={"250px"} />
          ))}
          {/* {imgToUse.map((imageSrc) => (
            <img src={imageSrc.dataURL} alt="not fount" width={"250px"} />
          ))} */}
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Update Product
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <label>Name</label>
                    <TextField
                      error={errors.name ? true : false}
                      type="text"
                      multiline
                      defaultValue={productDetails.name}
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
                    <label>Stock</label>
                    <TextField
                      error={errors.stock ? true : false}
                      multiline
                      defaultValue={productDetails.stock}
                      variant="outlined"
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
                    <label>Price</label>
                    <TextField
                      error={errors.price ? true : false}
                      multiline
                      defaultValue={productDetails.price}
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
                        The price can not be more than 1000
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <label>Description</label>
                    <TextField
                      error={errors.description ? true : false}
                      multiline
                      rows={4}
                      defaultValue={productDetails.description}
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

export default UpdateProduct;
