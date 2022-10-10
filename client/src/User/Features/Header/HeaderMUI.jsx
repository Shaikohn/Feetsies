import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import logo from "./Img/Logo.jpg";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
// import Fade from '@mui/material/Fade';
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../../redux/actions/auth";
import { useDispatch } from "react-redux";
// import MenuIcon from '@mui/icons-material/Menu';
import decode from "jwt-decode";
import { useReducer } from "react";

export default function ResponsiveAppBar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log(user);

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  console.log(location);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");

    setUser(null);
    forceUpdate();
  };

  //   var token = user?.token;
  //   var decoded = decode(token);

  //   console.log("information token", decoded);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, ignored]);

  return (
    <AppBar position="static" sx={{ bgcolor: "black", color: "#87a827" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Avatar
              alt=""
              src={logo}
              sx={{ width: 125, height: 125, m: 1.25 }}
            />
          </Link>
          <Link to="/">
            <Typography
              variant="h3"
              noWrap
              textDecoration="none"
              sx={{
                ml: 2,
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FEETSIES
            </Typography>
          </Link>
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/home/products">
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  fontSize: 20,
                  bgcolor: "secondary.main",
                  fontWeight: 600,
                  mx: 2,
                }}
                size="large"
                variant="outlined"
              >
                PRODUCTS
              </Button>
            </Link>
            <Link to="/home/animals">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block", fontSize: 20, mx: 2 }}
                size="large"
                variant="outlined"
              >
                ANIMALS
              </Button>
            </Link>
            <Link to="/home/createProduct">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block", fontSize: 20, mx: 2 }}
                size="large"
                color="secondary"
                variant="outlined"
              >
                CREATE PRODUCT
              </Button>
            </Link>
            <Link to="/home/shoppingView">
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  fontSize: 20,
                  bgcolor: "secondary.main",
                  fontWeight: 600,
                  mx: 2,
                }}
                size="large"
                variant="outlined"
              >
                CART
              </Button>
            </Link>
          </Box>
          {!user ? (
            <Box sx={{ flexGrow: 0 }} size="large">
              <Link to="/signUp">
                <Tooltip
                  title="Login / Register"
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 500 }}
                  arrow
                  // followCursor
                >
                  <Avatar sx={{ bgcolor: "#567900", width: 55, height: 55 }}>
                    <LoginIcon
                      fontSize="large"
                      sx={{ color: "#fedf6a", width: 35, height: 35 }}
                    />
                  </Avatar>
                </Tooltip>
              </Link>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }} size="large">
              <Tooltip
                title="Open settings"
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 500 }}
                arrow
                // followCursor
                // componentsProps={{bgcolor: "#87a827"}}
                // PopperProps={}
              >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "#567900", width: 55, height: 55 }}>
                    <AccountCircleIcon
                      fontSize="large"
                      sx={{ color: "#fedf6a", width: 35, height: 35 }}
                    />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))} */}
                <MenuItem onClick={handleCloseUserMenu}>
                  <PersonIcon sx={{ mr: 2 }} />
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <ManageAccountsIcon sx={{ mr: 2 }} />
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseUserMenu}>
                  <DashboardIcon sx={{ mr: 2 }} />
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 2 }} />
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
