import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCart } from "../../../redux/actions/shoppingCartA";
import styles from "./ProductCard.module.css";
import cart from "./Img/shopping-cart1.png";

export default function ProductCard({id, name, image, price, productTypes}) {
    
    const dispatch = useDispatch();
    const {productsBuyCopy} = useSelector(state => state.shoppingCart);

    function handleChange(e) {
        e.preventDefault();
        dispatch(addToCart(id));
    }

    return (
        <Link to={`/home/products/${id}`} className={styles.link}>
            <div className={styles.prodCard} key={id}>
                <div className={styles.prodContainer}>
                    <h2 className={styles.prodName}>{name}</h2>
                    <div>
                        <img className={styles.prodImg} src={image} alt="" width="200px" height="250px" />
                    </div>
                    <h2 className={styles.prodPrice}>{`$ ${price}`}</h2>
                    <div className={styles.prodTagsCointainer}>
                        {productTypes.map((tag, index)  => {
                            return (
                                <div className={styles.prodTag} key={index}>
                                    <h4 className={styles.tagName}>{tag}</h4>
                                </div>
                            )
                        })}
                    </div>
                    <div className="div-btn">
                        <button className="cart-btn" onClick={(e) => handleChange(e)}>
                            <img className="cart-icon" src={cart} alt="" weight="18px" height="18px" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
};