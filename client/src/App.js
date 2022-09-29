import "./App.css";
import { Route, Routes } from "react-router-dom";
import AnimalDetails from "./User/Views/AnimalDetails/AnimalDetails.jsx";
import ProductDetails from "./User/Views/ProductDetails/ProductDetails.jsx";
import Adoption from "./User/Features/Form/Adoption.jsx";
import AltaAdoption from "./User/Features/Form/AltaAdoption.jsx";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/home/products" element={<ProductDetails />}/>
        <Route exact path="/home/products/:id" element={<ProductDetails />}/>
        <Route exact path="/home/animals/:id" element={<AnimalDetails />}/>
        <Route exact path="/home/animals/:id/adoption" element={<Adoption />}/>
        <Route exact path="/home/altaadoption" element={<AltaAdoption />}/>
        <Route path="*" element={<main><p>The searched route was not found</p></main>}/>
      </Routes>
    </div>
  );
}

export default App;
