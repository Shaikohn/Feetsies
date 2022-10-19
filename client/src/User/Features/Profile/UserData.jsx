import * as React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import style from "./userStyles.module.css";
import { OutlinedInput } from "@mui/material";

export default function UserData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.userDetail);
  const [errorPas, setErrorPas] = useState(false)

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [values2, setValues2] = useState({
    passwordConfirm: "",
    showPasswordConfirm: false,
  });

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

  const [input, setInput] = useState({
    id: "",
    name: "",
    lastName: "",
    location: "",
    phone_number: "",
    password: "",
    password2:""
  });

  useEffect(() => {
    setInput({
      ...input,
      id: usuario.id,
      name: usuario.name,
      lastName: usuario.lastName,
      location: usuario.location,
      phone_number: usuario.phoneNumber,
      image: usuario.image,
    });
  }, [dispatch]);
  //Cloudinary//
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageChosen, setImageChosen] = useState(false);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "proyecto-final-animals");
    setImageChosen(true);
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
  //HANDLE SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      input.name !== usuario.name ||
      input.lastName !== usuario.lastName ||
      input.phone_number !== usuario.phoneNumber ||
      input.email !== usuario.email ||
      input.location !== usuario.location ||
      image !== usuario.image
    ) {
      try {
        await axios.put("/users/update", {
          ...input,
          image,
        });
        alert("succesfull update");
        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("no dates to update");
    }
  }

  //HANDLE CHANGE
  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "60ch", color: "white" },
            width: "62ch",
            my: "5%",
            mx: "30%",
            maxWidth: "100%",
            bgcolor: "#d8d8d8",
            borderRadius: "10px",
          }}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "60ch", color: "#000" },
              maxWidth: "100%",
              bgcolor: "#d8d8d8",
              borderRadius: "10px",
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <div>
                <TextField
                  sx={{
                    bgcolor: "#fff ",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                  id="outlined-helperText"
                  label="Name: "
                  value={input.name}
                  name="name"
                  onChange={(e) => handleChange(e)}
                  // defaultValue={usuario.name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {/* <span>
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
              </span> */}
              </div>
              <div>
                <TextField
                  sx={{
                    bgcolor: "#fff ",
                    color: "#",
                    borderRadius: "10px",
                  }}
                  // id="outlined-helperText"
                  label="LastName: "
                  value={input.lastName}
                  onChange={(e) => handleChange(e)}
                  name="lastName"
                  // defaultValue={usuario.lastName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              
              <div>
                <TextField
                  sx={{
                    bgcolor: "#fff ",
                    color: "#FFC400",
                    borderRadius: "10px",
                    mt:"20px"
                  }}
                  // id="outlined-number"
                  label="Cellphone: "
                  value={input.phone_number}
                  onChange={(e) => handleChange(e)}
                  name="phone_number"
                  type="number"
                  // defaultValue={input.phone_number ? input.phone_number : "Add your cellphone"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div>
                <TextField
                  sx={{
                    bgcolor: "#fff ",
                    color: "#FFC400",
                    borderRadius: "10px",
                    mt:"10px"
                  }}
                  id="input-with-icon-textfield"
                  label="Location: "
                  value={input.location}
                  onChange={(e) => handleChange(e)}
                  name="location"
                  // defaultValue={usuario.location}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              {!usuario.google?(
                <div>
                <div>
                    <FormControl variant="outlined" style={{ width: "98%" }} sx={{mt:"15px"}}>
                      <InputLabel
                        htmlFor="outlined-adornment-password1"
                        // shrink="true"
                      >
                        New password
                      </InputLabel>
                      <OutlinedInput
                        sx={{
                          bgcolor: "#fff ",
                          color: "000",
                          borderRadius: "10px",
                        }}
                        onChange={(e) => handleChange(e)}
                        name="password"
                        value={input.password}
                        id="outlined-adornment-password1"
                        type={values.showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              // onMouseDown={handleMouseDownPassword}
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
                      />
                    </FormControl>
                    
                    <br />
                  </div>
    
                  <div>
                    <FormControl variant="outlined" style={{ width: "98%" }} sx={{mt:"15px"}}>
                      <InputLabel
                        htmlFor="outlined-adornment-password1"
                        // shrink="true"
                      >
                        Confirm new password
                      </InputLabel>
                      <OutlinedInput
                        sx={{
                          bgcolor: "#fff ",
                          color: "000",
                          borderRadius: "10px",
                        }}
                        id="outlined-adornment-password1"
                        onChange={(e) => handleChange(e)}
                        name="password2"
                        value={input.password2}
                        type={values.showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              // onMouseDown={handleMouseDownPassword}
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
                      />
                    </FormControl>
                  </div>
                  <div style={{ color: "black", marginBottom:"10px" }}>
                      Password must have, one digit, one lowercase character, one
                      uppercase character and be at least 8 characters in length but
                      no more than 32
                    </div>
                </div>
              )
            :""}
              <div>
                <TextField
                  sx={{
                    bgcolor: "#fff ",
                    color: "#FFC400",
                    borderRadius: "10px",
                  }}
                  id="input-with-icon-textfield"
                  label="Profile Foto: "
                  value={input.image}
                  onChange={(e) => handleChange(e)}
                  name="image"
                  // defaultValue={"I"}
                  InputProps={{
                    shrink: true,
                  }}
                  variant="standard"
                />

                <input
                  className={style.seleccionarArchivo}
                  type="file"
                  name="file"
                  onChange={uploadImage}
                ></input>

                {imageChosen &&
                  (!loading ? (
                    <img
                      className={style.seleccionarArchivo}
                      src={image}
                      style={{ width: "50%" }}
                      alt="Usuario"
                    />
                  ) : (
                    <p>Wait a few moment</p>
                  ))}
              </div>
            </div>
          </Box>

          <Box sx={{ maxWidth: "100%" }}>
            <Stack direction="row" spacing={2}>
              <Button
                sx={{
                  m: 1,
                  width: "70ch",
                  color: "#022335",
                  bgcolor: "#fff",
                  borderColor: "#022335",
                  borderRadius: "10px",
                }}
                type="submit"
                variant="contained"
                startIcon={<EditIcon fontSize="large" />}
              >
                Save changes
              </Button>
            </Stack>
            <Link to="/profile">
              <Stack direction="row" spacing={2}>
                <Button
                  sx={{
                    m: 1,
                    width: "68ch",
                    color: "#022335",
                    bgcolor: "#fff",
                    borderColor: "#022335",
                    borderRadius: "10px",
                  }}
                  variant="contained"
                  startIcon={<KeyboardReturnIcon fontSize="large" />}
                >
                  Back
                </Button>
              </Stack>
            </Link>
          </Box>
        </Box>
        <br />
      </form>
    </div>
  );
}
