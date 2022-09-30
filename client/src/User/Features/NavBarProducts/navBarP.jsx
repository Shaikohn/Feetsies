import SearchBar from "../SearchBar/SearchBar.jsx";
import './NavBarProducts.css';


function NavBarProducts() {
  return (
    <nav className="container-navBar">
      <div>
      <SearchBar />
      </div>
      
      <ul className="navBar_options">
          <li className="options_filterAndOrder">
            Filter type product
            <ul className="filterAndOrder_subOptions">
              <li className="subOptions_option">Perro guau</li>
              <li className="subOptions_option">Gato miau</li>
            </ul>
          </li>
        
          <li className="options_filterAndOrder">
            Order by price
            <ul className="filterAndOrder_subOptions">
              <li className="subOptions_option">Low price to high price</li>
              <li className="subOptions_option">High price to low price</li>
            </ul>
          </li>
        

        
          <li className="options_filterAndOrder">
            Order by name
            <ul className="filterAndOrder_subOptions">
              <li className="subOptions_option">A to Z</li>
              <li className="subOptions_option">Z to A</li>
            </ul>
          </li>
        
      </ul>
    </nav>
  );
}

export default NavBarProducts;