import { useDispatch } from "react-redux";
import orderProductPrice from "../../../redux/actions/orderPrice.js";
import orderProductName from "../../../redux/actions/orderName.js";
import filterTypeProducts from "../../../redux/actions/filterTypeProducts.js";

import SearchBar from "../SearchBar/SearchBar";
import "./navBarProducts.css";

function NavBarProducts() {
  const dispatch = useDispatch();
  
  const eventHandlerPrice = (e) => {
    e.preventDefault();
    dispatch(orderProductPrice(e.target.value));
  };
  const eventHandlerName = (e) => {
    e.preventDefault();
    dispatch(orderProductName(e.target.value));
  };

  const eventHandlerProductType= (e)=>{
    e.preventDefault()
    dispatch(filterTypeProducts(e.target.value))
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

          <li className="subOptions_option">
              <button
              value="All"
              onClick={e=> eventHandlerProductType(e)}
              >All types</button>
            </li>
            <li className="subOptions_option">
              <button
              value="Food"
              onClick={e=> eventHandlerProductType(e)}
              >Food</button>
            </li>

            <li className="subOptions_option">
              <button
              value="Toy"
              onClick={e=> eventHandlerProductType(e)}
              >Toys</button>
            </li>

            <li className="subOptions_option">
              <button
              value="Clothing"
              onClick={e=> eventHandlerProductType(e)}
              >Clothing</button>
            </li>
            <li className="subOptions_option">
              <button
              value="Other"
              onClick={e=> eventHandlerProductType(e)}
              >Other</button>
            </li>
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
              <button value="asc" onClick={(e) => eventHandlerName(e)}>
                A to Z
              </button>
            </li>
            <li className="subOptions_option">
              <button value="desc" onClick={(e) => eventHandlerName(e)}>
                Z to A
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default NavBarProducts;
