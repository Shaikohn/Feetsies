import React from "react";
import styles from "./ProductDetails.module.css"

export default function ProductDetails({product}) {

    

    return (
            <div className={styles.detailsBackground} key={product?.id}>
                <div>
                    <div>
                        <img className={styles.mainImg} src={product?.image} alt="" width="200px" height="250px" />
                    </div>
                    <div className={styles.infoContainer}>
                        <h1 className={styles.name}>{`${product?.name}`}</h1>
                        <h2 className={styles.price}>{`$${product?.price}`}</h2>
                        <h3>{`Stock: ${product?.stock}`}</h3>
                        <h3>{`${product?.description}`}</h3>
                    </div>
                    {/* <div>
                        <button>Buy now</button>
                        <button>Add to Cart</button>
                    </div> */}
                </div>
            </div>
    )
};