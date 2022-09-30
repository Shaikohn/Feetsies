import ProductCard from "../../Features/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../../redux/actions/getProductsA";
import Header from "../../Features/Header/Header.jsx";
import NavBar from "../../Features/NavBarProducts/navBarP.jsx";

export default function ProductHome() {

    const dispatch = useDispatch()
    const {allProductsCopy} = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    return (
        <div>
            <div className="divprod-header">
                <Header />
            </div>
            <div className="divprod-navbar">
                <NavBar />
            </div>
            <div className="bodyprod-container">
            {
                allProductsCopy.length !== 0 ? allProductsCopy?.map((p) => {
                    return (
                        <div key={p.id}>
                            <ProductCard 
                                id={p.id}
                                name={p.name}
                                image={p.image}
                                price={p.price}
                                product_tags={p.product_tags}
                            />
                        </div>
                    )
                }) : ""
            } 
            </div>
        </div>
        
    )
}