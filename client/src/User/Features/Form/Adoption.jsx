import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./CreateProduct.module.css";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../../redux/actions/getProductsA.js";
import Swal from 'sweetalert2'

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";


import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";

import { Grid, Card, CardContent, Typography, TextField, Button,  Drawer} from "@mui/material";



const Adoption = () => {

  const dispatch = useDispatch();

  const { register, formState: { errors }, handleSubmit } = useForm({ 
    defaultValues: { topic: "", description: "", name: "" }});

  const onSubmit = (data) => console.log("Onsubmit", data);

  return (
    <div>
      <ResponsiveAppBar />
      <div className={styles.createForm}>
        <Grid>
            <Card sx={{maxWidth: 450, padding: "20px 5px", margin: "0 auto"}}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Adoption Form
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <TextField
                        error={errors.topic ? true : false}
                        label="Topic"
                        variant="outlined"
                        fullWidth
                        {...register("topic", {required: true})}
                        aria-invalid={errors.topic ? "true" : "false"}
                      />
                      {errors?.topic?.type === "required" && (
                        <span style={{ color: "red" }}>
                          A short reason is required
                        </span>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.name ? true : false}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        {...register("name", { required: true})}
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                      {errors?.name?.type === "required" && (
                        <span style={{ color: "red" }}>
                          Your name is required
                        </span>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.description ? true : false}
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={10}
                        fullWidth
                        {...register("description", { required: true})}
                        aria-invalid={errors.description ? "true" : "false"}
                      />
                      {errors?.description?.type === "required" && (
                        <span style={{ color: "red" }}>
                          You have to write a description!
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
                      Adopt
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

export default Adoption;
