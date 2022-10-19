import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Adoption from "./User/Features/Form/Adoption.jsx";
import AltaAdoption from "./User/Features/Form/AltaAdoption.jsx";
import HomeProducts from "./User/Views/ProductHome/ProductHome.jsx";
import HomeAnimals from "./User/Views/AnimalHome/AnimalHome.jsx";
import ProductDetailsContainer from "./User/Views/ProductDetails/ProductDetailsContainer";
import AnimalDetailsContainer from "./User/Views/AnimalDetails/AnimalDetailsContainer";
import LandingPage from "./User/Views/Landing/Landing.jsx";
import ShoppingView from "./User/Views/ShoppingView/ShoppingView.jsx";
import CreateProduct from "./User/Features/Form/CreateProduct";
import SignUp from "./User/Features/Form/SignUp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SignIn from "./User/Features/Form/SignIn";

import Dashboard, { DashboardLanding } from "./Admin/components/Dashboard";
import CheckEmails from "./User/Views/CheckEmail";
import AccountConfirmed from "./User/Views/AccountConfirmed";
import ResetPassword from "./User/Views/ResetPassword";
import ForgotPassword from "./User/Views/ForgotPassword";
import { useState } from "react";
import UsersList from "./Admin/components/UsersList";
import ProductsList from "./Admin/components/ProductsList";
import { AnimalsTable } from "./Admin/components/AnimalTable";
import UserData from "./User/Features/Profile/UserData";
import UserProfile from "./User/Features/Profile/UserProfile";
import OrderDetail from "./User/Features/Profile/OrderDetail";
import ProductHome from "./User/Views/ProductHome/ProductHome.jsx";
import UpdateProduct from "./User/Features/Form/UpdateProduct";
import Inquiry from "./User/Features/Form/Inquiry";


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#bada59",
        main: "#87a827",
        dark: "#567900",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ffff9b",
        main: "#fedf6a",
        dark: "#c8ad39",
        contrastText: "#000",
      },
    },

    // typography: {
    //   fontFamily: "Arial",
    //   fontSize: 14, (14px es el valor por defecto)
    //   fontWeight: 500,
    //   fontStyle: "italic",
    //   textDecoration: "none",
    // },
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div id='contact' style={{position: 'absolute', left: '70%', top:'35%', zIndex:1}}/>
        <div id='adminModal' />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home/products" element={<ProductHome />} />
          <Route exact path="/home/animals" element={<HomeAnimals />} />
          <Route exact path="/home/inquiry" element={<Inquiry />} />
          <Route
            exact
            path="/home/products/:id"
            element={<ProductDetailsContainer />}
          />
          <Route
            exact
            path="/home/animals/:id"
            element={<AnimalDetailsContainer />}
          />
          <Route
            exact
            path="/home/animals/:id/adoption"
            element={<Adoption />}
          />
          <Route exact path="/home/altaAdoption" element={<AltaAdoption />} />
          <Route exact path="/home/shoppingView" element={<ShoppingView />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route
            path="/signIn"
            element={user ? <Navigate to="/" replace /> : <SignIn />}
          />
          <Route
            exact
            path="/checkEmail"
            element={user ? <Navigate to="/" replace /> : <CheckEmails />}
          />
          <Route
            exact
            path="/confirm/:confirmationCode"
            element={user ? <Navigate to="/" replace /> : <AccountConfirmed />}
          />
          <Route
            exact
            path="/reset-password/:id/:token"
            element={user ? <Navigate to="/" replace /> : <ResetPassword />}
          />
          <Route
            exact
            path="/forgot-password"
            element={user ? <Navigate to="/" replace /> : <ForgotPassword />}
          />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<DashboardLanding />} />
            <Route path="animaltable" element={<AnimalsTable />} />
            <Route path="users" element={<UsersList />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="createProduct" element={<CreateProduct />} />
            <Route path="updateProduct/:id" element={<UpdateProduct />} />
          </Route>
          <Route path="profile" element={<UserProfile />} />
          <Route path="user/data" element={<UserData />} />
          <Route path="profile/orderDetail/:id" element={<OrderDetail />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
