import ProductCard from "../../Features/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import getAllProducts from "../../../redux/actions/getProductsA";

export default function ProductHome() {

    const dispatch = useDispatch()
    const {allProducts} = useSelector(state => state.products)
    console.log(allProducts)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    return (
        <div>
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
    )
}