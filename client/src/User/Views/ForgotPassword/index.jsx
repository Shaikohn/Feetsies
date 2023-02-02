import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Swal from 'sweetalert2'

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// React Hook Form
import { useForm } from "react-hook-form";

const onSubmit = async (data) => {
  try {
    const sendEmail = await axios.post(
      "/user/auth/forgot-password",
      data
    );
    Swal.fire({
      title: 'EMAIL SENT', 
      text: "Check your inbox!", 
      icon: 'success',
      timer: 3000
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: 'EMAIL NOT SENT', 
      text: error?.response?.data?.status, 
      icon: 'error',
      timer: 3000
    });
  }
};

const ForgotPassword = () => {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  return (
    <Container>
      <Box
        //   sx={{ bgcolor: "#cfe8fc", height: "50vh" }}
        sx={{
          bgcolor: "#cfe8fc",
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <h1>Forgot Password</h1>
        <h4>Enter your email</h4>
        <p>The one you'll need to log in.</p>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errors.email ? true : false}
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors?.email?.type === "required" && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
                {errors?.email?.type === "pattern" && (
                  <span style={{ color: "red" }}>Email invalid</span>
                )}
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send <ArrowForwardIcon />
            </Button>
          </form>
        </Container>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
