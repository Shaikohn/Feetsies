import React from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";

// React Hook Form
import { useForm } from "react-hook-form";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignUp = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const [values2, setValues2] = React.useState({
    passwordConfirm: "",
    showPasswordConfirm: false,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Onsubmit", { ...data });
    try {
      await axios.post("http://localhost:3001/products/create", data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(errors);

  //   SHOW PASSWORD
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowPassword2 = () => {
    setValues2({
      ...values2,
      showPasswordConfirm: !values2.showPasswordConfirm,
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setValues2({ ...values2, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.firstName ? true : false}
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName", {
                    required: true,
                    pattern: /^[a-zA-Z ]*$/i,
                    maxLength: 10,
                  })}
                  aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors?.firstName?.type === "required" && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
                {errors?.firstName?.type === "maxLength" && (
                  <span style={{ color: "red" }}>
                    The name cannot exceed 20 characters
                  </span>
                )}
                {errors?.firstName?.type === "pattern" && (
                  <span style={{ color: "red" }}>
                    Alphabetical characters only
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.lastName ? true : false}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  {...register("lastName", {
                    required: "This field is required",
                    pattern: /^[a-zA-Z ]*$/i,
                    maxLength: 10,
                  })}
                  aria-invalid={errors.lastName ? "true" : "false"}
                />
                {errors?.lastName?.type === "required" && (
                  <span style={{ color: "red" }}>
                    {errors.lastName?.message}
                  </span>
                )}
                {errors?.lastName?.type === "maxLength" && (
                  <span style={{ color: "red" }}>
                    last name cannot exceed 20 characters
                  </span>
                )}
                {errors?.lastName?.type === "pattern" && (
                  <span style={{ color: "red" }}>
                    Alphabetical characters only
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.phoneNumber ? true : false}
                  name="phoneNumber"
                  fullWidth
                  id="phoneNumber"
                  label="Phone number"
                  autoFocus
                  type="number"
                  {...register("phoneNumber", {
                    required: true,
                    maxLength: 9,
                  })}
                  aria-invalid={errors.phoneNumber ? "true" : "false"}
                />
                {errors?.phoneNumber?.type === "required" && (
                  <span style={{ color: "red" }}>This camp is required</span>
                )}
                {errors?.phoneNumber?.type === "maxLength" && (
                  <span style={{ color: "red" }}>
                    Phone number cannot be more than 9
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.location ? true : false}
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  {...register("location", {
                    required: "This field is required",
                  })}
                  aria-invalid={errors.location ? "true" : "false"}
                />
                {errors?.location?.type === "required" && (
                  <span style={{ color: "red" }}>
                    {errors.location?.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.email ? true : false}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
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
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password1">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password1"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  error={errors.confirmPassword ? true : false}
                  variant="outlined"
                  fullWidth
                  {...register("confirmPassword", {
                    required: true,
                    pattern: /^[a-zA-Z ]*$/i,
                    maxLength: 20,
                  })}
                >
                  <InputLabel>Confirm password</InputLabel>
                  <OutlinedInput
                    type={values2.showPasswordConfirm ? "text" : "password"}
                    value={values2.passwordConfirm}
                    onChange={handleChange("passwordConfirm")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values2.showPasswordConfirm ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm password"
                  />
                  {errors?.confirmPassword?.type === "pattern" && (
                    <span style={{ color: "red" }}>
                      error passowd must have fix
                    </span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
