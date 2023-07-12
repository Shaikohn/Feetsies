//resubir
import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";

// Google
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// React Hook Form
import { useForm } from "react-hook-form";
import { google } from "../../../redux/actions/auth";

/* function Copyright(props) {
  return (
    <Typography color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link href="https://mui.com/">
        <Typography sx={{ color: "#87a827", fontSize: 15 }}>
          FEETSIES
        </Typography>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
} */

const theme = createTheme();

const SignUp = () => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const [customError, setCustomError] = useState("");
  const [values2, setValues2] = useState({
    passwordConfirm: "",
    showPasswordConfirm: false,
  });

  const navigateTo = useNavigate();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data, e) => {
    try {
      const register = await axios.post("/user/auth/register", data);
      if (
        register.data.message ===
        "User was registered successfully! Please check your email"
      ) {
        navigateTo("/checkEmail");
      }
      setCustomError("");
    } catch (error) {
      if (error.response.data.errors[0].msg) {
        setCustomError(error.response.data.errors[0].msg);
        setTimeout(() => {
          setCustomError("");
        }, 4000);
      }
    }
  };

  //SHOW PASSWORD
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

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "188844152504-6cfeoicbmi1ioo4gsiaf8uf7d1petuhb.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, [dispatch]);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(google(token, navigateTo));
      /* Swal.fire({
        title: "LOGGED IN",
        text: "Your google account is now connected with the page!",
        icon: "success",
        timer: 5000,
      }); */
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "LOGIN FAILED",
        text: "Sorry, the page couldnt connect to your Goggle account",
        icon: "error",
        timer: 5000,
      });
    }
  };

  return (
    <div>
      <ResponsiveAppBar />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
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
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.name ? true : false}
                name="name"
                style={{ width: "100%" }}
                id="name"
                label="Name"
                autoFocus
                autoComplete="off"
                {...register("name", {
                  required: true,
                  pattern: /^[a-zA-Z ]*$/i,
                  maxLength: 10,
                })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors?.name?.type === "required" && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
              {errors?.name?.type === "maxLength" && (
                <span style={{ color: "red" }}>
                  The name cannot exceed 20 characters
                </span>
              )}
              {errors?.name?.type === "pattern" && (
                <span style={{ color: "red" }}>
                  Alphabetical characters only
                </span>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.lastName ? true : false}
                style={{ width: "100%" }}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="off"
                {...register("lastName", {
                  required: "This field is required",
                  pattern: /^[a-zA-Z ]*$/i,
                  maxLength: 10,
                })}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors?.lastName?.type === "required" && (
                <span style={{ color: "red" }}>{errors.lastName?.message}</span>
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
            {/* <Grid item xs={12} sm={6}>
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
              </Grid> */}
            {/* <Grid item xs={12} sm={6}>
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
              </Grid> */}
            <Grid item xs={12}>
              <TextField
                error={errors.email ? true : false}
                style={{ width: "100%" }}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
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
              {!errors.email
                ? customError && (
                    <span style={{ color: "red" }}>{customError}</span>
                  )
                : ""}
            </Grid>
            <Grid container spacing={2} style={{marginTop: '5px'}}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" style={{ width: "97%", marginLeft: '13px' }}>
                <InputLabel htmlFor="outlined-adornment-password1">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password1"
                  type={values.showPassword ? "text" : "password"}
                  // value={values.password}
                  // onChange={handleChange("password")}
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
                  error={errors.password ? true : false}
                  {...register("password", {
                    required: "Password is required!",
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  })}
                />
                {errors.password && (
                  <span style={{ color: "red" }}>
                    {errors.password.message}
                  </span>
                )}
                {errors?.password?.type === "pattern" && (
                  <span style={{ color: "red" }}>
                    Password must have, one digit, one lowercase character, one
                    uppercase character and be at least 8 characters in length
                    but no more than 32
                  </span>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" style={{ width: "97%" }}>
                <InputLabel>Confirm password</InputLabel>
                <OutlinedInput
                  type={values2.showPasswordConfirm ? "text" : "password"}
                  // value={values2.passwordConfirm}
                  // onChange={handleChange("passwordConfirm")}
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
                  error={errors.passwordConfirmation ? true : false}
                  {...register("passwordConfirmation", {
                    required: "Please confirm password!",
                    pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const { password } = getValues();
                        return password === value || "Passwords should match!";
                      },
                    },
                  })}
                />
                {errors.passwordConfirmation && (
                  <span style={{ color: "red" }}>
                    {errors.passwordConfirmation.message}
                  </span>
                )}
                {errors?.passwordConfirmation?.type === "pattern" && (
                  <span style={{ color: "red" }}>
                    Password must have, one digit, one lowercase character, one
                    uppercase character and be at least 8 characters in length
                    but no more than 32
                  </span>
                )}
              </FormControl>
            </Grid>
            </Grid>
          </Grid>

          <Button
            type="submit"
            style={{ width: "100%" }}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          {/* <hr />
          <h3>Or sign in with</h3>
          <hr /> */}
          {/* Google Auth */}
          <Grid container style={{ width: "100%" }} justifyContent="center">
            <Grid
              item
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              <GoogleLogin
                clientId="188844152504-6cfeoicbmi1ioo4gsiaf8uf7d1petuhb.apps.googleusercontent.com"
                buttonText="Sign In"
                onSuccess={googleSuccess}
                onFailure={googleSuccess}
                cookiePolicy={"single_host_origin"}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/signIn" variant="body2">
                <Typography sx={{ color: "#87a827" }}>
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      /> */}
    </Container>
    </div>
  );
};

export default SignUp;
