//resubir
import React from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

// React Hook Form
import { useForm } from "react-hook-form";
import { signIn } from "../../../redux/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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

const SignIn = () => {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  //const onSubmit = async (data) => {
    //console.log("Onsubmit", data);
    // try {
    //   await axios.post("http://localhost:3001/products/create", data);
    // } catch (error) {
    //   console.log(error);
    // }
  const dispatch = useDispatch();

  const navigateTo = useNavigate();

  const onSubmit = async (data) => {
    console.log("Onsubmit", data);
    try {
      const login = await axios.post(
        "http://localhost:3001/user/auth/login",
        data
      );
      console.log(login.data);
      dispatch(signIn(data, navigateTo));
      // navigateTo("/");
      Swal.fire({
        title: 'Logged in', 
        text: login.data.msg, 
        icon: 'success',
        timer: 5000
      });
      // if (
      //   login.data.response.data ===
      //   "Pending Account. Please Verify Your Email!"
      // ) {
      //   alert("Pending Account. Please Verify Your Email!");
      // }
    } catch (error) {
      console.log(error);
      // if (
      //   error.response.data === "Pending Account. Please Verify Your Email!"
      // ) {
      //   alert("Pending Account. Please Verify Your Email!");
      // } else if (error.response.data == `email ${email} invalid or not found`) {
      //   alert(`email ${email} invalid or not found`);
      // }
      Swal.fire({
        title: 'Login Failed', 
        text: error.response.data, 
        icon: 'error',
        timer: 5000
      });
    }
  };
  console.log(errors);

  return (
    // <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://www.comfortzone.com/-/media/Images/ComfortZone-NA/US/Blog/cats-playing-or-fighting.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: true,
              })}
            />
            {errors?.password?.type === "required" && (
              <span style={{ color: "red" }}>Your password is required</span>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
    // </ThemeProvider>
  );
};

export default SignIn;
