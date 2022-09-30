import React from "react";
import { Link } from "react-router-dom";
// import ".Header.module.css";

export default function Header() {

    return (
        <div className="header">
            <div className="container">
                <Link to="/home/products" className="header-link">Products</Link>
                <Link to="/home/animals" className="header-link">Animals</Link>
                <Link to="/home/altaadoption" className="header-link">Register Adoption</Link>
                <Link to="/home/profile" className="header-link">My Profile</Link>
            </div>
        </div>
    )
};