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
import { useParams } from "react-router-dom";

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
  console.log(productDetails);

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

  console.log(isSubmitSuccessful);
  const onSubmit = async (data) => {
    console.log("Onsubmit", { ...data });
    try {
      await axios.put(`/products/update`, {
        ...data,
        imgToUse,
      });
      Swal.fire({
        title: "Success",
        text: "Product Created",
        icon: "success",
        timer: 5000,
      });
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
                Update Product
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <TextField
                      label="Product´s Name"
                      type="text"
                      multiline
                      defaultValue={productDetails.name}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Stock"
                      multiline
                      defaultValue={productDetails.stock}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Price"
                      multiline
                      defaultValue={productDetails.price}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      multiline
                      rows={4}
                      defaultValue={productDetails.description}
                      variant="outlined"
                      fullWidth
                    />
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
