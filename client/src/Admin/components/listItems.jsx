import * as React from "react";
import {
  People,
  ShoppingCart,
  BarChart,
  Layers,
  Assignment,
  Home,
  Pets,
  Dashboard,
} from "@mui/icons-material/";
import { Link } from "react-router-dom";
import {
  ListItemIcon,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

export const mainListItems = (
  <React.Fragment>
    <Link to="/">
      <ListItemButton>
        <ListItemIcon>
          <Home sx={{ color: "#567900", width: 35, height: 35, mr: 4 }} />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ color: "#87a827", fontWeight: 600, fontSize: 24 }}>
            Home
          </Typography>
        </ListItemText>
      </ListItemButton>
    </Link>
    <Link to="/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <Dashboard sx={{ color: "#567900", width: 35, height: 35, mr: 4 }} />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ color: "#87a827", fontWeight: 600, fontSize: 24 }}>
            Dashboard
          </Typography>
        </ListItemText>
      </ListItemButton>
    </Link>
    <Link to="/dashboard/animaltable">
      <ListItemButton>
        <ListItemIcon>
          <Pets sx={{ color: "#567900", width: 35, height: 35, mr: 4 }} />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ color: "#87a827", fontWeight: 600, fontSize: 24 }}>
            Animals
          </Typography>
        </ListItemText>
      </ListItemButton>
    </Link>
    <Link to="/dashboard/users">
      <ListItemButton>
        <ListItemIcon>
          <People sx={{ color: "#567900", width: 35, height: 35, mr: 4 }} />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ color: "#87a827", fontWeight: 600, fontSize: 24 }}>
            Users
          </Typography>
        </ListItemText>
      </ListItemButton>
    </Link>
    <Link to="/dashboard/products">
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon
            sx={{ color: "#567900", width: 35, height: 35, mr: 4 }}
          />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ color: "#87a827", fontWeight: 600, fontSize: 24 }}>
            Products
          </Typography>
        </ListItemText>
      </ListItemButton>
    </Link>
    <Link to="/dashboard/orders">
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon
            sx={{ color: "#567900", width: 35, height: 35, mr: 4 }}
          />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ color: "#87a827", fontWeight: 600, fontSize: 24 }}>
            Orders
          </Typography>
        </ListItemText>
      </ListItemButton>
    </Link>
    {/* <ListItemButton>
      <ListItemIcon>
        <BarChart />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Layers />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
