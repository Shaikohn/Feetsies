import AnimalCard from "../../Features/AnimalCard/AnimalCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllAnimals } from "../../../redux/actions/getAnimalsA";
import Header from "../../Features/Header/Header.jsx";
import NavBarAnimals from "../../Features/NavBarAnimal/NavBarAni.jsx";
import Pagination from "../../Features/Paginado/Paginado.jsx";



export default function AnimalHome() {

    const dispatch = useDispatch()
    const {allAnimalsCopy} = useSelector(state => state.animals)

    useEffect(() => {
        dispatch(getAllAnimals())
    }, [dispatch])

    return (
        <div>
            <div className="divanim-header">
                <Header />
            </div>
            <div className="divanim-navbar">
                <NavBarAnimals />
            </div>
            <div className="div-pagination">
                <Pagination />
            </div>
            <div className="bodyanim-container">
            {
                allAnimalsCopy.length !== 0 ? allAnimalsCopy?.map((a) => {
                    return (
                        <div key={a.id}>
                            <AnimalCard 
                                id={a.id}
                                name={a.name}
                                main_image={a.main_image}
                                sex={a.sex}
                                size={a.size}
                            />
                        </div>
                    )
                    
                }) : "There is no animals at the moment"
            }
            </div>
        </div>
    )
}