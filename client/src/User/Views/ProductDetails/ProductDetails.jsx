import React from "react";
import styles from "./ProductDetails.module.css"

export default function ProductDetails({product}) {

    

    return (
            <div key={product?.id}>
                <div>
                    <div>
                        <img className={styles.mainImg} src={product?.image} alt="" width="200px" height="250px" />
                    </div>
                    <div className={styles.infoContainer}>
                        <h2>{`Name: ${product?.name}`}</h2>
                        <h3>{`Price: $${product?.price}`}</h3>
                        <h3>{`Stock: ${product?.stock}`}</h3>
                        <h3>{`Description: ${product?.description}`}</h3>
                    </div>
                    <div>
                        <button>Buy now</button>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>
    )
};