import { useDispatch } from "react-redux";
import orderProductPrice from "../../../redux/actions/Products/orderPrice.js";
import orderProductName from "../../../redux/actions/Products/orderName.js";

import SearchBar from "../SearchBar/SearchBar";
import "./navBarProducts.css";

function NavBarProducts() {
  const dispatch = useDispatch();
  const eventHandlerPrice = (e) => {
    e.preventDefault();
    dispatch(orderProductPrice(e.target.value));
  };
  const eventHandlerName = (e)=>{
    e.preventDefault();
    dispatch(orderProductName(e.target.value))
  }

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
            <li className="subOptions_option">
              <button value="asc" onClick={(e) => eventHandlerPrice(e)}>
                Low to high price
              </button>
            </li>
            <li className="subOptions_option">
              <button value="desc" onClick={(e) => eventHandlerPrice(e)}>
                High to low price
              </button>
            </li>
          </ul>
        </li>

        <li className="options_filterAndOrder">
          Order by name
          <ul className="filterAndOrder_subOptions">
            <li className="subOptions_option">
              <button
              value="asc"
              onClick={e=> eventHandlerName(e)}
              >A to Z</button>
            </li>
            <li className="subOptions_option">
              <button
              value="desc"
              onClick={e=> eventHandlerName(e)}
              >Z to A</button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default NavBarProducts;
