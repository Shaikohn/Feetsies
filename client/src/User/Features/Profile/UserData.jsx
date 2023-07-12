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
import { getUserDetail } from "../../../redux/actions/userDetailA";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Swal from "sweetalert2"
import style from "./userStyles.module.css";
import { OutlinedInput } from "@mui/material";
import Modal from "@mui/material/Modal";

export default function UserData({open, setOpen}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.userDetail);
  const [errorPas, setErrorPas] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  ;
  const styleUser = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    paddingLeft: '-50%'
  };

  function validate(input) {
    let errors = {};
    if (input.password.length > 1 && input.password !== input.password2 ) errors.password = "Password should match";
    return errors;
  }

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
  const [errors, setError] = useState({});
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
    if(typeof phone_number !== Number) {
      setInput({
        ...input,
        id: usuario.id,
        name: usuario.name,
        lastName: usuario.lastName,
        location: usuario.location,
        phone_number: "",
        image: usuario.image,
      });
    } else {
      setInput({
        ...input,
        id: usuario.id,
        name: usuario.name,
        lastName: usuario.lastName,
        location: usuario.location,
        phone_number: usuario.phone_number,
        image: usuario.image,
      });
    }
  }, [dispatch]);
  //Cloudinary//
  const [image, setImage] = useState("");
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "proyecto-final-animals");
    // setImageChosen(true);
    // setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/tawaynaskp/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setInput({...input, image:file.secure_url});
    setImage(file.secure_url)
    

    
  };
  //HANDLE SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      (input.name !== usuario.name ||
      input.lastName !== usuario.lastName ||
      input.phone_number !== usuario.phoneNumber ||
      input.email !== usuario.email ||
      input.location !== usuario.location ||
      image !== usuario.image) && (
        !errors.name && !errors.password
      )
    ) {
      try {
        await axios.put("/users/update", {
          ...input,
          image,
        });
        Swal.fire({
          title: "UPDATED",
          text: "Your user info has been updated!",
          icon: "success",
          timer: 1000,
        });
        dispatch(getUserDetail(input.id))
        handleClose();
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "NOT UPDATED",
          text: "Sorry, something failed and the info couldnt be updated",
          icon: "error",
          timer: 3000,
        });
      }
    } else {
      Swal.fire({
        title: "NOT UPDATED",
        text: "No changes detected!",
        icon: "warning",
        timer: 3000,
    });
    }
  }

  //HANDLE CHANGE
  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        password2: e.target.value
      })
    )
  }

  return (
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  onLoad={() => handleOpen()}
  >
    {/* <Box sx={styleUser}> */}

      <div style={{width: '100%', margin:'auto'}}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box
          sx={{
            "& .MuiTextField-root": {width: "100%", color: "white", m: 1 }           
          }}
        >
          <Box
            /* component="form" */
            sx={{
              "& .MuiTextField-root": { width: "100%", color: "#000", },
              maxWidth: "100%",
              bgcolor: "#d8d8d8",
              borderRadius: "10px",
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{margin:'auto', padding:'3%', width: '100%'}}>
              <div>
              {/* <input
                  className={style.seleccionarArchivo}
                  type="file"
                  name="file"
                  onChange={uploadImage}
                  draggable
                  style={{borderRadius: '50%', width: '7em', height:'7em', marginLeft:'38%', position: 'absolute', opacity:'0%'}}
                />
               
                <img
                  className={style.seleccionarArchivo}
                  src={input.image}
                  style={{ width: "7em", height:'7em', borderRadius: "50%", marginLeft:'45%', objectFit: 'cover' }}
                  alt="Usuario"
                /> */}
                  
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
                    mt:"10px"
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
                        htmlFor="outlined-adornment-password2"
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
                        id="outlined-adornment-password2"
                        onChange={(e) => handleChange(e)}
                        name="password2"
                        value={input.password2}
                        type={values.showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword2}
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
                    {
                      errors?<div style={{ color: "red", marginBottom:"10px" }}>{errors.password}</div>
                      :""
                    }
                </div>
              )
            :""}
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
              <Button
                sx={{
                  m: 1,
                  width: "70ch",
                  color: "#f25d07",
                  bgcolor: "#fff",
                  borderColor: "#f25d07",
                  borderRadius: "10px",
                }}
                style={{marginTop: '10px', height: '80px'}}
                onClick={handleClose}
                variant="contained"
                startIcon={<EditIcon fontSize="large" />}
              >
                Close
              </Button>
            </Stack>            
          </Box>
        </Box>
        <br />
      </form>
    </div>
    {/* </Box> */}
    </Modal>
  );
}
