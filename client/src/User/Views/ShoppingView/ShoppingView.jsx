import React from "react";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import ShoppingCart from "../../Features/ShoppingCart/ShoppingCart";

export default function ShoppingView () {

    return (
        <div>
            <div>
                <ResponsiveAppBar />
            </div>
            <div>
                <ShoppingCart />
            </div>
        </div>
    )
}