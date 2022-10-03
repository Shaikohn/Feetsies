import { useDispatch } from "react-redux";
import orderProductPrice from "../../../redux/actions/orderPrice.js";
import orderProductName from "../../../redux/actions/orderName.js";
import filterTypeProducts from "../../../redux/actions/filterTypeProducts.js";
import { setPage } from "../../../redux/actions/paginadoA.js";
import SearchBarProd from "../SearchBarProd/SearchBarProd.jsx";
import styles from "./navBarP.module.css";

function NavBarProducts() {
  const dispatch = useDispatch();
  
  const eventHandlerPrice = (e) => {
    e.preventDefault();
    dispatch(orderProductPrice(e.target.value));
    dispatch(setPage(1))
  };
  const eventHandlerName = (e) => {
    e.preventDefault();
    dispatch(orderProductName(e.target.value));
    dispatch(setPage(1))
  };

  const eventHandlerProductType= (e)=>{
    e.preventDefault()
    dispatch(filterTypeProducts(e.target.value))
    dispatch(setPage(1))
  }

  return (
    <nav className={styles.navContainer}>
      <div>
        <SearchBarProd />
      </div>

      <ul className={styles.navUl}>
        <li className={styles.navLiItem}>
          Filter type product
          <ul className={styles.navLiItemUl}>

          <li className={styles.navLiItemUlLi}>
              <button
              value="All"
              onClick={e=> eventHandlerProductType(e)}
              >All types</button>
            </li>
            <li className={styles.navLiItemUlLi}>
              <button
              value="Food"
              onClick={e=> eventHandlerProductType(e)}
              >Food</button>
            </li>

            <li className={styles.navLiItemUlLi}>
              <button
              value="Toy"
              onClick={e=> eventHandlerProductType(e)}
              >Toys</button>
            </li>

            <li className={styles.navLiItemUlLi}>
              <button
              value="Clothing"
              onClick={e=> eventHandlerProductType(e)}
              >Clothing</button>
            </li>
            <li className={styles.navLiItemUlLi}>
              <button
              value="Other"
              onClick={e=> eventHandlerProductType(e)}
              >Other</button>
            </li>
          </ul>
        </li>

        <li className={styles.navLiItem}>
          Order by price
          <ul className={styles.navLiItemUl}>
            <li className={styles.navLiItemUlLi}>
              <button value="asc" onClick={(e) => eventHandlerPrice(e)}>
                Low to high
              </button>
            </li>
            <li className={styles.navLiItemUlLi}>
              <button value="desc" onClick={(e) => eventHandlerPrice(e)}>
                High to low
              </button>
            </li>
          </ul>
        </li>

        <li className={styles.navLiItem}>
          Order by name
          <ul className={styles.navLiItemUl}>
            <li className={styles.navLiItemUlLi}>
              <button value="asc" onClick={(e) => eventHandlerName(e)}>
                A to Z
              </button>
            </li>
            <li className={styles.navLiItemUlLi}>
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
