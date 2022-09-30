import ProductCard from "../../Features/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../../redux/actions/getProductsA";
import Header from "../../Features/Header/Header.jsx";
import NavBar from "../../Features/NavBarProducts/navBarP.jsx";

export default function ProductHome() {

    const dispatch = useDispatch()
    const {allProducts} = useSelector(state => state.products)
    console.log(allProducts)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    return (
        <div>
            <div className="div-header">
                <Header />
            </div>
            <div className="div-navbar">
                <NavBar />
            </div>
            <div className="body-container">
            {
                allProducts.length !== 0 ? allProducts?.map((p) => {
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