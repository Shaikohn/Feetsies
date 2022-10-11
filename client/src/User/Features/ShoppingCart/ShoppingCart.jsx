import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function ShoppingCart(id) {

    const dispatch = useDispatch();
    const {productsBuy} = useSelector(state => state.shoppingCart);
    const {cart} = useSelector(state => state.shoppingCart);



    return (
        <div>
            <h2>Carrito de compras</h2>
            <h3>Productos que quiero comprar</h3>
            <article className="box">
                {productsBuy.map(p => {
                    <div key={id}>
                        <h1>{p.name}</h1>
                        <h2>{p.price}</h2>
                        <div>
                            <img src={p.image} alt="" width="100px" height="125px" />
                        </div>
                    </div>
                })}
            </article>
            <h3>Carrito</h3>
            <article className="box"></article>
        </div>
    )
}