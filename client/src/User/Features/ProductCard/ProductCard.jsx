import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./ProductCard.module.css";
// import cart from "./Img/shopping-cart1.png";

export default function ProductCard({id, name, image, price, productTypes}) {

    // function handleChange(e) {
    //     //falta codigo
    // }

    return (
            <div key={id}>
                <Link to={`/home/products/${id}`} className={styles.link}>
                <div className={styles.productCard}>
                    <h2 className="product-name">{name}</h2>
                    <div>
                        <img className="img" src={image} alt="" width="200px" height="250px" />
                    </div>
                    <h2 className="product-price">{`$ ${price}`}</h2>
                    <div className="product-container">
                        <h4>{productTypes}</h4>
                        {/* {productTypes?.map(tag => {
                            return (
                                <div className="div-tag" value={tag.name} key={tag.index}>
                                    <h5>{tag.name}</h5>
                                </div>
                            )
                        })} */}
                    </div>
                    {/* <div className="div-btn">
                        <button className="cart-btn" onClick={(e) => handleChange(e)}>
                            <img className="cart-icon" src={cart} alt="" weight="18px" height="18px" />
                        </button>
                    </div> */}
                </div>
                </Link>
            </div>
    )
};