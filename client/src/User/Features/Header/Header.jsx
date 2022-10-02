import React from "react";
import { Link } from "react-router-dom";
import logo from "./Img/Logo.jpg";
import styles from "./Header.module.css";

export default function Header() {

    return (
        <div className={styles.divHeader}>
            <div>
                <img className={styles.logo} src={logo} alt="" width="200px" height="200px"/>
            </div>
            <div className={styles.headerCont}>
                <div className={styles.headerDiv}>
                    <Link to="/home/products" className={styles.headerLink}>Products</Link>
                </div>
                <div className={styles.headerDiv}>
                    <Link to="/home/animals" className={styles.headerLink}>Animals</Link>
                </div>
                <div className={styles.headerDiv}>
                    <Link to="/home/altaAdoption" className={styles.headerLink}>Register Adoption</Link>
                </div>
                <div className={styles.headerDiv}>
                    <Link to="/home/createProduct" className={styles.headerLink}>Create Product</Link>
                </div>
                {/* <div className={styles.headerDiv}>
                    <Link to="/home/profile" className={styles.headerLink}>My Profile</Link>
                </div> */}
            </div>
        </div>
    )
};