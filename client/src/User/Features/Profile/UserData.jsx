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

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import style from "./userStyles.module.css";

export default function UserData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.userDetail);
 
  const [input, setInput] = useState({
    id: "",
    name: "",
    lastName: "",
    location: "",
    phone_number: "",
    password: "",
  });
 

  useEffect(() => {
    setInput({
      id: usuario.id,
      name: usuario.name,
      lastName: usuario.lastName,
      location: usuario.location,
      phone_number: usuario.phoneNumber,
      email: usuario.email,
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
                // id="outlined-helperText"
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
                }}
                // id="outlined-number"
                label="New password: "
                value={input.password}
                onChange={(e) => handleChange(e)}
                name="password"
                type="password"
                // defaultValue={usuario.email ? "" : "Add an email"}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div style={{ color: "black" }}>
                Password must have, one digit, one lowercase character, one
                uppercase character and be at least 8 characters in length but
                no more than 32
              </div>
              <br/>
            </div>
            <div>
              <TextField
                sx={{
                  bgcolor: "#fff ",
                  color: "#FFC400",
                  borderRadius: "10px",
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
