import "./App.css";
import { Route, Routes } from "react-router-dom";
import Adoption from "./User/Features/Form/Adoption.jsx";
import AltaAdoption from "./User/Features/Form/AltaAdoption.jsx";
import HomeProducts from "./User/Views/ProductHome/ProductHome.jsx";
import HomeAnimals from "./User/Views/AnimalHome/AnimalHome.jsx";
import ProductDetailsContainer from "./User/Views/ProductDetails/ProductDetailsContainer";
import AnimalDetailsContainer from "./User/Views/AnimalDetails/AnimalDetailsContainer";
import LandingPage from "./User/Views/Landing/Landing.jsx";
import CreateProduct from "./User/Features/Form/CreateProduct";
import SignUp from "./User/Features/Form/SignUp";

function App() {
  return (
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
        <Route exact path="/home/animals/:id/adoption" element={<Adoption />} />
        <Route exact path="/home/altaAdoption" element={<AltaAdoption />} />
        <Route exact path="/home/createProduct" element={<CreateProduct />} />
        {/* Sign Up Form */}
        <Route exact path="/home/signUp" element={<SignUp />} />
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
  );
}

export default App;
