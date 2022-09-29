import React from "react";
import styles from "./ProductDetails.module.css"

export default function ProductDetails({id, name, description, image, price, stock}) {

    return (
            <div key={id}>
                <div>
                    <div>
                        <img className={styles.mainImg} src={image} alt="" width="200px" height="250px" />
                    </div>
                    <div className={styles.infoContainer}>
                        <h2>{`Name: ${name}`}</h2>
                        <h3>{`Price: $${price}`}</h3>
                        <h3>{`Stock: ${stock}`}</h3>
                        <h3>{`Description: ${description}`}</h3>
                    </div>
                    <div>
                        <button>Buy now</button>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>
    )
};