import React from "react";
import { Link } from "react-router-dom";
import ".ProductCard.module.css";

export default function ProductCard({id, name, image, price, product_tags}) {

    return (
        <Link to={`/home/product/${id}`} className="link">
            <div className="product-card">
                <div>
                    <h2 className="product-name">{name}</h2>
                    <div>
                        <img className="img" src={image} alt="" width="200px" height="250px" />
                    </div>
                    <h2 className="product-price">{`$ ${price}`}</h2>
                    <div className="container">
                        {
                            product_tags.map(tag => {
                                <div className="div-tag" value={tag.name} key={tag.id}>
                                    <h5>{tag.name}</h5>
                                </div>
                            })
                        }
                    </div>
                    <div className="div-btn">
                        <button></button>
                    </div>
                </div>
            </div>
        </Link>
    )
};