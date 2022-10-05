import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import logo from "./Img/Logo.jpg";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
// import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
// import MenuIcon from '@mui/icons-material/Menu';



export default function ResponsiveAppBar() {

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

    return (
        <AppBar position="static" sx={{bgcolor: "black", color: "#87a827"}}>
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
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link to="/home/products">
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: 'block', fontSize: 20, 
                                    bgcolor: "secondary.main", 
                                    fontWeight: 600,
                                    mx: 2
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
                                sx={{ my: 2, display: 'block', fontSize: 20, mx: 2 }}
                                size="large"
                                variant="outlined"
                            >
                                ANIMALS
                            </Button>
                        </Link>
                        <Link to="/home/createProduct">
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: 'block', fontSize: 20, mx: 2 }}
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
                                sx={{ my: 2, display: 'block', fontSize: 20, 
                                    bgcolor: "secondary.main", 
                                    fontWeight: 600,
                                    mx: 2
                                }}
                                size="large"
                                variant="outlined"
                            >
                                CART
                            </Button>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }} size="large">
                        <Tooltip 
                            title="Open settings"
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 500 }}
                            arrow
                            followCursor
                            // componentsProps={{bgcolor: "#87a827"}}
                            // PopperProps={}
                        >
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor:"#567900", width: 55, height: 55 }}>
                                    <AccountCircleIcon  
                                        fontSize="large" 
                                        sx={{ color:"#fedf6a", width: 35, height: 35 }}
                                    />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
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
                                <PersonIcon sx={{mr: 2}}/>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <ManageAccountsIcon sx={{mr: 2}}/>
                                <Typography textAlign="center">Account</Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleCloseUserMenu}>
                                <DashboardIcon sx={{mr: 2}}/>
                                <Typography textAlign="center">Dashboard</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <LogoutIcon sx={{mr: 2}}/>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
