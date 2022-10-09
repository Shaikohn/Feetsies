import "./App.css";
import { Route, Routes } from "react-router-dom";
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
import CheckEmails from "./User/Views/CheckEmail";
import AccountConfirmed from "./User/Views/AccountConfirmed";
import ResetPassword from "./User/Views/ResetPassword";
import ForgotPassword from "./User/Views/ForgotPassword";

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
    // },
  });

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
          <Route exact path="/signUp" element={<SignUp />} />
          {/* Sign in Form */}
          <Route exact path="/signIn" element={<SignIn />} />
          <Route exact path="/checkEmail" element={<CheckEmails />} />
          <Route
            exact
            path="/confirm/:confirmationCode"
            element={<AccountConfirmed />}
          />
          {/* Reset Password */}
          <Route
            exact
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          {/* Forgot Password */}
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="*"
            element={
              <main>
                <p>The searched route was not found</p>
              </main>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
