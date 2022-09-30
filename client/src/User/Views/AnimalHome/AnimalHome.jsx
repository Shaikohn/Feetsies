import AnimalCard from "../../Features/AnimalCard/AnimalCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllAnimals } from "../../../redux/actions/getAnimalsA";
import Header from "../../Features/Header/Header.jsx";



export default function AnimalHome() {

    const dispatch = useDispatch()
    const {allAnimals} = useSelector(state => state.animals)

    useEffect(() => {
        dispatch(getAllAnimals())
    }, [dispatch])

    return (
        <div>
            <div className="divanim-header">
                <Header />
            </div>
            <div className="divanim-navbar">
                
            </div>
            <div className="bodyanim-container">
            {
                allAnimals.length !== 0 ? allAnimals?.map((a) => {
                    return <AnimalCard 
                    id={a.id}
                    name={a.name}
                    main_image={a.main_image}
                    sex={a.sex}
                    size={a.size}
                    />
                }) : "There is no animals at the moment"
            }
            </div>
        </div>
    )
}