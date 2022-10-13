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
  Drawer,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Adoption = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      topic: "",
      description: "",
      name: "",
    },
  });

  const onSubmit = (data) => console.log("Onsubmit", data);

  console.log(errors);

  return (
    <Drawer>
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
                  Adoption Form
                </Typography>
              </CardContent>
            </Card>
        </Grid>
        </div>
        <h1></h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Motive</label>
          <input
            {...register("motive", { required: true })}
            aria-invalid={errors.motive ? "true" : "false"}
          />
          {errors.motive?.type === "required" && (
            <p role="alert">A short reason is required</p>
          )}

          <label>Name</label>
          <input
            {...register("name", { required: "Your name is required" })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <p role="alert">{errors.name?.message}</p>}

          <label>Description</label>
          <textarea
            {...register("description", {
              required: "You have to write a description!",
            })}
            aria-invalid={errors.description ? "true" : "false"}
            cols="30"
            rows="10"
          ></textarea>
          {errors.description && (
            <p role="alert">{errors.description?.message}</p>
          )}

          <button>Adopt</button>
        </form>
      </div>
    </Drawer>
  );
};

export default Adoption;
