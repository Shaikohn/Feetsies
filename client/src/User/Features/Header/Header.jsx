import React from "react";
import { Link } from "react-router-dom";
import logo from "./Img/Logo.jpg";
// import ".Header.module.css";

export default function Header() {

    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="" weight="200px" height="200px"/>
            </div>
            <div className="container">
                <div><Link to="/home/products" className="header-link">Products</Link></div>
                <div><Link to="/home/animals" className="header-link">Animals</Link></div>
                <div><Link to="/home/altaAdoption" className="header-link">Register Adoption</Link></div>
                <div><Link to="/home/createProduct" className="header-link">Create Product</Link></div>
                {/* <div><Link to="/home/profile" className="header-link">My Profile</Link></div> */}
            </div>
        </div>
    )
};