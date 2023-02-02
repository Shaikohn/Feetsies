import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import Swal from 'sweetalert2'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { useNavigate, useParams } from "react-router-dom";

// React Hook Form
import { useForm } from "react-hook-form";
import axios from "axios";

const ResetPassword = () => {
  const { id, token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    // if (id.length && token.length < 8) {
    //   alert("Something was wrong");
    //   navigate("/");
    // }
    axios
      .get(`/user/auth/reset-password/${id}/${token}`)
      .catch((error) => {
        Swal.fire({
          title: "RESET PASSWORD FAILED",
          text: error,
          icon: "error",
          timer: 2000,
        });
        navigate("/");
      });
  }, []);

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const [values2, setValues2] = useState({
    passwordConfirm: "",
    showPasswordConfirm: false,
  });

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `/user/auth/reset-password/${id}/${token}`,
        data
      );
      Swal.fire({
        title: 'Success', 
        text: "Password updated successfully", 
        icon: 'success',
        timer: 5000
      });
      navigate("/signIn");
    } catch (error) {
      console.log(error);
      alert("Something was wrong");
    }
  };

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
        <h1>Reset Password</h1>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password1">
                    New Password
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
                    label="New Password"
                    error={errors.password ? true : false}
                    {...register("password", {
                      required: "Password is required!",
                      pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                    })}
                  />
                  {errors.password && (
                    <span style={{ color: "red" }}>
                      {errors.password.message}
                    </span>
                  )}
                  {errors?.password?.type === "pattern" && (
                    <span style={{ color: "red" }}>
                      8 characters min,one digit,lowercase and uppercase are
                      mandatory
                    </span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined">
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
                          return (
                            password === value || "Passwords should match!"
                          );
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
                      8 characters min,one digit,lowercase and uppercase are
                      mandatory
                    </span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send
            </Button>
          </form>
        </Container>
      </Box>
    </Container>
  );
};

export default ResetPassword;
