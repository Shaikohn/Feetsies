import * as React from "react";
import ReactDOM from "react-dom";
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

import { getUserDetail } from "../../../redux/actions/userDetailA";
import getPurchaseOrders from "../../../redux/actions/getOrdersUser";
import getReviewsUser from "../../../redux/actions/getReviewsUserA";
import getRequestAdoptionsUser from "../../../redux/actions/requestAdoptionUser";

import ResponsiveAppBar from "../Header/HeaderMUI";
import { Paper, Typography } from "@mui/material";
import Image from "./Img/BgImg3.jpg";
import { Box, Container } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserData from "./UserData";

export default function UserProfile() {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetail(user.data.id));
    dispatch(getPurchaseOrders(user.data.id));
    dispatch(getReviewsUser(user.data.id));
    dispatch(getRequestAdoptionsUser(user.data.id));
  }, [dispatch]);

  const { usuario } = useSelector((state) => state.userDetail);
  const { purchaseOrder } = useSelector((state) => state.purchaseOrder);
  const { reviews } = useSelector((state) => state.userReviews);
  const {adoptions} = useSelector((state)=> state.adoptionUser)

  const [openModal, setOpenModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openB, setOpenB] = React.useState(false);
  const [openC, setOpenC] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickB = () => {
    setOpenB(!openB);
  };

  const handleClickC = () => {
    setOpenC(!openC);
  };
  const handleClickD = () => {
    setOpenD(!openD);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0.8, 0, 0)),url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <ResponsiveAppBar />
      {openModal &&
        <UserData open={openModal} setOpen={setOpenModal} />
      }
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          width: "100%",
          my: "5%",
          maxWidth: "100%",
        }}
      >
        <List
          sx={{
            bgcolor: "#fedf6ade",
            borderRadius: "20px",
            minWidth: "45%",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              sx={{
                mb: 2,
                bgcolor: "#87a827",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "flex-start",
                m: 0.7,
              }}
              component="div"
              id="nested-list-subheader"
            >
              <ListItem sx={{ display: "flex" }}>
                <ListItemAvatar
                  sx={{
                    display: "flex",
                    color: "red",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    sx={{ width: 60, height: 60, ml: 0 }}
                  >
                    {usuario.image ? (
                      <img src={usuario.image} className={style.foto} alt="" />
                    ) : (
                      <AccountCircleIcon
                        className={style.foto2}
                        fontSize="large"
                      />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ display: "flex", flexDirection: "column", m: 1.5 }}
                  primary={
                    <Typography sx={{ fontWeight: 600, mx: 2 }}>
                      {" "}
                      Hello {usuario?.name}
                    </Typography>
                  }
                  secondary={
                    usuario?.isAdmin === true ? (
                      <Typography sx={{ fontWeight: 600, mx: 2 }}>
                        {" "}
                        Administrator{" "}
                      </Typography>
                    ) : (
                      ""
                    )
                  }
                />
              </ListItem>
            </ListSubheader>
          }
        >
          <ListItemButton onClick={handleClick} sx={{ my: 2 }}>
            <ListItemIcon>
              <AccountCircleIcon
                sx={{ color: "#567900", width: 45, height: 45 }}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
                My personal data
              </Typography>
            </ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ py: 0, px: 2, display: "flex", justifyContent: "center" }}
              >
                <ListItemIcon sx={{ p: 2 }}>
                  <Container>
                    <Box>
                      {usuario?.name ? (
                        <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                          User: {usuario.name + " " + usuario.lastName}
                        </Typography>
                      ) : (
                        <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                          Complete your name
                        </Typography>
                      )}
                    </Box>
                    <Divider
                      sx={{
                        fontWeight: 700,
                        m: 0.4,
                        bgcolor: "#567900",
                        border: "1px solid #567900",
                      }}
                    />
                    <Box>
                      {usuario?.email ? (
                        <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                          Email: {usuario.email}
                        </Typography>
                      ) : (
                        <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                          Complete your email
                        </Typography>
                      )}
                    </Box>
                    <Divider
                      sx={{
                        fontWeight: 700,
                        m: 0.4,
                        bgcolor: "#567900",
                        border: "1px solid #567900",
                      }}
                    />
                    <Box>
                      {usuario?.location ? (
                        <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                          Location: {usuario.location}
                        </Typography>
                      ) : (
                        <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                          Location: Add your location
                        </Typography>
                      )}
                    </Box>
                    <Divider
                      sx={{
                        fontWeight: 700,
                        m: 0.4,
                        bgcolor: "#567900",
                        border: "1px solid #567900",
                      }}
                    />
                    <Box>
                      {usuario?.phone_number ? (
                        <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                          Cellphone: {usuario.phone_number}
                        </Typography>
                      ) : (
                        <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                          Cellphone: Add your cellphone
                        </Typography>
                      )}
                    </Box>
                    <Divider
                      sx={{
                        fontWeight: 700,
                        m: 0.4,
                        bgcolor: "#567900",
                        border: "1px solid #567900",
                      }}
                    />
                    <Box sx={{ m: 1.5, mb: 0 }}>
                      <Stack direction="row" fontSize="small">
                        <Button
                          sx={{
                            border: "3px groove #c8ad39",
                            bgcolor: "black",
                            borderRadius: "15px",
                            color: "white",
                          }}
                          variant="contained"
                          onClick={() => setOpenModal(true)}
                          startIcon={
                            <EditIcon
                              fontSize="large"
                              sx={{ color: "#c8ad39", width: 23, height: 23 }}
                            />
                          }
                        >
                          <Typography
                            sx={{ color: "white", fontWeight: 500 }}
                          >
                            {" "}
                            Update your personal data{" "}
                          </Typography>
                        </Button>
                      </Stack>
                    </Box>
                  </Container>
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickB} sx={{ my: 2 }}>
            <ListItemIcon>
              <LocalMallIcon
                sx={{ color: "#567900", width: 45, height: 45 }}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
                My purchase orders
              </Typography>
            </ListItemText>
            {openB ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openB} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ py: 0, px: 2, display: "flex", justifyContent: "center" }}
              >
                <ListItemIcon sx={{ p: 2 }}>
                  <Container>
                    {purchaseOrder.length ? (
                      purchaseOrder.map((order, id) => {
                        return (
                          <Box key={`${id}`}>
                            <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                              Mount: $ {order.total}{" "}
                            </Typography>
                            <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                              Date: {order.createdAt}
                            </Typography>
                            <Button
                              sx={{
                                border: "3px groove #c8ad39",
                                bgcolor: "black",
                                borderRadius: "15px",
                                color: "white",
                                my: 2,
                              }}
                              variant="contained"
                              startIcon={
                                <VisibilityIcon
                                  fontSize="large"
                                  sx={{
                                    color: "#c8ad39",
                                    width: 20,
                                    height: 20,
                                  }}
                                />
                              }
                            >
                              <Link to={`orderDetail/${order.id}`}>
                                <Typography
                                  sx={{
                                    color: "white",
                                    fontWeight: 500,
                                    fontSize: 12,
                                  }}
                                >
                                  View details
                                </Typography>
                              </Link>
                            </Button>
                            <Divider
                              sx={{
                                fontWeight: 700,
                                m: 0.4,
                                bgcolor: "#567900",
                                border: "1px solid #567900",
                              }}
                            />
                          </Box>
                        );
                      })
                    ) : (
                      <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                        Not found purchase orders
                      </Typography>
                    )}
                  </Container>
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickC} sx={{ my: 2 }}>
            <ListItemIcon>
              <LocalMallIcon
                sx={{ color: "#567900", width: 45, height: 45 }}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
                My Reviews
              </Typography>
            </ListItemText>
            {openC ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openC} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ py: 0, px: 2, display: "flex", justifyContent: "center" }}
              >
                <ListItemIcon sx={{ p: 2 }}>
                  <Container>
                    {reviews.length ? (
                      reviews.map((review, id) => {
                        return (
                          <Box key={`${id}`}>
                            <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                              Score: {review.score}{" "}
                            </Typography>

                            <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                              Product: {review.productName}
                            </Typography>

                            <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                              Review: {review.comment}
                            </Typography>
                            <Divider
                              sx={{
                                fontWeight: 700,
                                m: 0.4,
                                bgcolor: "#567900",
                                border: "1px solid #567900",
                              }}
                            />
                          </Box>
                        );
                      })
                    ) : (
                      <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                        Not found reviews
                      </Typography>
                    )}
                  </Container>
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickD} sx={{ my: 2 }}>
            <ListItemIcon>
              <LocalMallIcon
                sx={{ color: "#567900", width: 45, height: 45 }}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
                My adoption request
              </Typography>
            </ListItemText>
            {openC ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openD} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ py: 0, px: 2, display: "flex", justifyContent: "center" }}
              >
                <ListItemIcon sx={{ p: 2 }}>
                  <Container>
                    {adoptions.length ? (
                      adoptions.map((adop, id) => {
                        return (
                          <Box key={`${id}`}>
                            <img src={adop.animal.main_image} width="100px" height="100px" alt="pet"/>
                            <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                              Name: {adop.animal.name}{" "}
                            </Typography>

                            <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                              Sex: {adop.animal.sex}
                            </Typography>

                            <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                              Age: {adop.animal.age}
                            </Typography>
                            <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                              Size: {adop.animal.size}
                            </Typography>
                            <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                              Description: {adop.animal.description}
                            </Typography>
                            <Divider
                              sx={{
                                fontWeight: 700,
                                m: 0.4,
                                bgcolor: "#567900",
                                border: "1px solid #567900",
                              }}
                            />
                          </Box>
                        );
                      })
                    ) : (
                      <Typography sx={{ p: 0.5, pb: 0, color: "black" }}>
                        Not request found
                      </Typography>
                    )}
                  </Container>
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Collapse>
        </List>

        <Link to="/">
          <Button
            sx={{
              m: 1,
              width: "40ch",
              border: "3px groove #c8ad39",
              bgcolor: "black",
              borderRadius: "15px",
              color: "white",
              my: 2,
            }}
            variant="contained"
            startIcon={
              <KeyboardReturnIcon
                fontSize="large"
                sx={{ color: "#c8ad39", width: 25, height: 25 }}
              />
            }
          >
            Back to home
          </Button>
        </Link>
      </Grid>
    </Paper>
  );
}
