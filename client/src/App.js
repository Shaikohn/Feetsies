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

import Dashboard, {DashboardLanding} from "./Admin/components/Dashboard";
import CheckEmails from "./User/Views/CheckEmail";
import AccountConfirmed from "./User/Views/AccountConfirmed";
import ResetPassword from "./User/Views/ResetPassword";
import ForgotPassword from "./User/Views/ForgotPassword";
import { useState } from "react";
import UsersList from "./Admin/components/UsersList";
import ProductsList from "./Admin/components/ProductsList";
import { AnimalsTable } from "./Admin/components/AnimalTable";

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
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home/products" element={<HomeProducts />} />
          <Route exact path="/home/animals" element={<HomeAnimals />} />
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
          <Route exact path="/home/createProduct" element={<CreateProduct />} />
          <Route exact path="/home/shoppingView" element={<ShoppingView />} />
          {/* Sign Up Form */}
          <Route
            exact
            path="/signUp"
            element={user ? <Navigate to="/" replace /> : <SignUp />}
          />
          {/* Sign in Form */}
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
          {/* Reset Password */}
          <Route
            exact
            path="/reset-password/:id/:token"
            element={user ? <Navigate to="/" replace /> : <ResetPassword />}
          />
          {/* Forgot Password */}
          <Route
            exact
            path="/forgot-password"
            element={user ? <Navigate to="/" replace /> : <ForgotPassword />}
          />
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='' element={<DashboardLanding />} />
            <Route path='animaltable' element={<AnimalsTable />} />
            <Route path='users' element={<UsersList />} />
            <Route path='products' element={<ProductsList />}/>
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
