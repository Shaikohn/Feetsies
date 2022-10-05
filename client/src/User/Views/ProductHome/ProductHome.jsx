import ProductCard from "../../Features/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../redux/actions/getProductsA";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import NavBarProd from "../../Features/NavBarProducts/navBarP.jsx";
import Pagination from "../../Features/Paginado/Paginado.jsx";
import loading from "./Img/Loading.gif";
import styles from "./ProductHome.module.css";



export default function ProductHome() {

    const dispatch = useDispatch()
    const {allProductsCopy} = useSelector(state => state.products)
    const {page} = useSelector((state) => state.currentPage);

    const [productsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(page);
    const lastPositionPerPage = productsPerPage * currentPage;
    const firstPositionPerPage = lastPositionPerPage - productsPerPage;
    const currentProducts = allProductsCopy.slice(
        firstPositionPerPage,
        lastPositionPerPage
    );


    useEffect(() => {
        if(allProductsCopy.length ===0){
            dispatch(getAllProducts())
        }
        setCurrentPage(page)
    }, [dispatch,page])


    return (
        <div>
            <div>
                <ResponsiveAppBar />
            </div>
            <div className="divprod-navbar">
                <NavBarProd />
            </div>
            <div className="div-pagination">
                <Pagination
                items={allProductsCopy.length}
                itemsPerPage={productsPerPage}
                />
            </div>
            <div className={styles.bodyImg}>
                {currentProducts.length ? (
                    <div className={styles.bodyProd}>
                        {currentProducts.map(p => {
                            return (
                                <ProductCard
                                    id={p.id}
                                    name={p.name}
                                    image={p.image}
                                    price={p.price}
                                    productTypes={p.productTypes}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <div>
                        <img className={styles.loading} src={loading} alt="Loading..." />
                    </div>
                )
                } 
            </div>
        </div>
    )
}