import * as React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./userStyles.module.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";

// import { connect, useSelector, useDispatch } from "react-redux";
// import { UpdateUserA } from "../../redux/actions/DashboardUpdateUserA"; //   UpdateProductR.UpdateProduct
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import style from "./assets/PerfilDelUsuario.module.css";
// import Grid from "@mui/material/Grid";
// import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { alertTitleClasses } from "@mui/material";
// import Loading from "../loading/Loading.jsx";
// import { useSnackbar } from "notistack";

export default function UserData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.userDetail);
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const [input, setInput] = useState({
    id: "",
    name: "",
    lastName: "",
    location: "",
    phone_number: "",
    email: "",
  });
  console.log({ userDeytail: usuario });
  const [imageChosen, setImageChosen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    setInput({
      id: usuario.id,
      name: usuario.name,
      lastName: usuario.lastName,
      location: usuario.location,
      phone_number: usuario.phoneNumber,
      email: usuario.email,
    });
  }, [dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      input.name !== usuario.name ||
      input.lastName !== usuario.lastName ||
      input.phone_number !== usuario.phoneNumber ||
      input.email !== usuario.email ||
      input.location !== usuario.location
    ) {
      try {
        await axios.put("http://localhost:3001/users/update", input);
        alert("succesfull update");
        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("no dates to update");
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  async function uploadImage(e) {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ecommerce");
    setImageChosen(true);
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/hentech/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
    setInput({ ...input, picture: file.secure_url });
  }
  return (
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
                // id="outlined-helperText"
                label={usuario.name ? "Current name: " : "Name: "}
                htmlFor="name"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
                defaultValue={usuario.name}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <TextField
                sx={{
                  bgcolor: "#fff ",
                  color: "#",
                  borderRadius: "10px",
                }}
                // id="outlined-helperText"
                label={usuario.lastName ? "Current LastName: " : "LastName: "}
                htmlFor="lastName"
                value={input.lastName}
                onChange={(e) => handleChange(e)}
                name="lastName"
                defaultValue={usuario.lastName}
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
                }}
                // id="outlined-number"
                label={
                  usuario.phoneNnumber ? "Current cellphone: " : "Cellphone:"
                }
                htmlFor="phoneNumber"
                value={input.phone_number}
                onChange={(e) => handleChange(e)}
                name="phone_number"
                type="number"
                defaultValue={usuario.phoneNumber}
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
                }}
                // id="outlined-number"
                label={usuario.email ? "Current email: " : "Email:"}
                htmlFor="email"
                value={input.email}
                onChange={(e) => handleChange(e)}
                name="email"
                type="text"
                defaultValue={usuario.email ? "" : "Add an email"}
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
                }}
                // id="input-with-icon-textfield"
                label={usuario.location ? "Current location" : "Location:"}
                htmlFor="location"
                value={input.location}
                onChange={(e) => handleChange(e)}
                name="location"
                defaultValue={usuario.location}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            {/* <div>
              <TextField
                sx={{
                  bgcolor: "#fff ",
                  color: "#FFC400",
                  borderRadius: "10px",
                }}
                id="input-with-icon-textfield"
                label={usuario.picture ? "" : "Foto:"}
                htmlFor="picture"
                value={input.picture}
                onChange={(e) => handleChange(e)}
                name="picture"
                defaultValue={usuario.picture ? "" : "Ingrese una foto"}
                InputProps={{
                  shrink: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      {usuario.picture ? (
                        <img
                          src={usuario.picture}
                          className={style.fotoBtn}
                          alt=""
                        />
                      ) : (
                        <img
                          className={style.fotoBtn}
                          src={user.picture}
                          alt=""
                        />
                      )}
                    </InputAdornment>
                  ),
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
                  <p>wait a few moment</p>
                ))}
            </div> */}
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
  );
}
