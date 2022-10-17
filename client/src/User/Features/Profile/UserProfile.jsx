import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import { Link } from "react-router-dom";

import style from "./userStyles.module.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";

import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { getUserDetail } from "../../../redux/actions/userDetailA";
import getPurchaseOrders from "../../../redux/actions/getOrdersUser";
import axios from "axios";

export default function UserProfile() {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const { usuario } = useSelector((state) => state.userDetail);
  const {purchaseOrder} = useSelector((state)=> state.purchaseOrder);
  console.log(purchaseOrder)

  const [open, setOpen] = React.useState(false);
  //   const [openA, setOpenA] = React.useState(false);
  const [openB, setOpenB] = React.useState(false);
  //   const [openC, setOpenC] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  //   const handleClickA = () => {
  //     setOpenA(!openA);
  //   };

  const handleClickB = () => {
    setOpenB(!openB);
  };
  //   const handleClickC = () => {
  //     setOpenC(!openC);
  //   };

  const dispatch = useDispatch();
  


  useEffect(() => {
    dispatch(getUserDetail(user.data.id));
    dispatch(getPurchaseOrders(user.data.id))
    // setPurchaseOrder(
    //  handleOrders()
    // )
  }, [user]);

  // const order  = useSelector ((state) => state.userOrderR.userOrder);
  /* console.log("Soy order", order); */

  // if(isLoading){
  //     return <Loading />
  // }
  return (
    <div className={style.container}>
      <Grid
        container
        justify="center"
        sx={{ width: "100%", my: "5%", maxWidth: "100%" }}
        flexDirection="column"
      >
        <List
          sx={{
            bgcolor: "#fff",
            borderRadius: "10px",
            color: "#000 ",
            mx: "auto",
            minWidth: "60%",
            width: "auto",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              sx={{
                mb: 2,
                ml: 0,
                width: "100%",
                maxWidth: "100%",
                bgcolor: "#87a827",
                borderRadius: "10px",
                color: "000 ",
              }}
              component="div"
              id="nested-list-subheader"
            >
              <div>
                <ListItem>
                  <ListItemAvatar
                    sx={{
                      alignItems: "center",
                      color: "red",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      sx={{ width: 60, height: 60, ml: 0 }}
                    >
                      {usuario.image ? (
                        <img
                          src={usuario.image}
                          className={style.foto}
                          alt=""
                        />
                      ) : (
                        <AccountCircleIcon
                          className={style.foto2}
                          fontSize="large"
                        />
                      )}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <p className={style.espacio}> Hello {usuario?.name}</p>
                    }
                    secondary={
                      usuario?.isAdmin === true ? (
                        <p className={style.espacio}> Administrator </p>
                      ) : (
                        ""
                      )
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            </ListSubheader>
          }
        >
          {/* <br/> */}
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <AccountCircleIcon className={style.iconos} fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="My personal data" />

            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <div>
                    <div>
                      {usuario?.name ? (
                        <p className={style.subTitulo}>
                          User: {usuario.name + " " + usuario.lastName}
                        </p>
                      ) : (
                        <p className={style.subTitulo}>Complete your name</p>
                      )}
                    </div>
                    <hr/>
                    <div>
                      {usuario?.email ? (
                        <p className={style.subTitulo}>
                          Email: {usuario.email}
                        </p>
                      ) : (
                        <p className={style.subTitulo}>Complete your email</p>
                      )}
                    </div>
                    <hr/>
                    <div>
                      {usuario?.location ? (
                        <p className={style.subTitulo}>
                          Location: {usuario.location}
                        </p>
                      ) : (
                        <p className={style.subTitulo}>
                          Location: add your location
                        </p>
                      )}
                    </div>
                    <hr/>
                    <div>
                      {usuario?.phoneNumber ? (
                        <p className={style.subTitulo}>
                          Cellphone: {usuario.phoneNumber}
                        </p>
                      ) : (
                        <p className={style.subTitulo}>
                          Cellphone: add your cellphone
                        </p>
                      )}
                    </div>
                    <hr/>

                    <div>
                      <Stack direction="row" fontSize="small">
                        <Button
                          sx={{
                            bgcolor: "#dee2e6 ",
                            borderRadius: "10px",
                            color: "#FFC400 ",
                          }}
                          variant="outlined"
                          startIcon={<EditIcon fontSize="large" />}
                        >
                          <Link className={style.modificar} to="/user/data">
                            {" "}
                            Update your personal data{" "}
                          </Link>
                        </Button>
                      </Stack>
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleClickB}>
            <ListItemIcon>
              <LocalMallIcon className={style.iconos} fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="My purchase orders" />
            {openB ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openB} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <div>
                    {
                    purchaseOrder ? (
                      purchaseOrder.map((order) => {
                        return(
                        <div>
                          <p className={style.subTitulo}
                          >Mount: $ {order.total} </p>
                          <p className={style.subTitulo}
                          >Date: {order.createdAt}</p>
                          
                          <button>
                            View details
                          </button>
                          <hr/>
                        </div>
                        
                        )
                      }))
                     : ( <p className={style.subTitulo}>
                        Cellphone: add your cellphone
                      </p>
                    )}
                  </div>
                </ListItemIcon>
                <ListItemText primary="" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Link to="/">
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
            Back to home
          </Button>
        </Link>
      </Grid>
    </div>
  );
}
