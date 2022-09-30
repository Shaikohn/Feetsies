import AnimalCard from "../../Features/AnimalCard/AnimalCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import getAllAnimals from "../../../redux/actions/getAnimalsA";

export default function AnimalHome() {

    const dispatch = useDispatch()
    const {allAnimals} = useSelector(state => state.animals)
    console.log(allAnimals)

    useEffect(() => {
        dispatch(getAllAnimals())
    }, [dispatch])

    return (
        <div>
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
    )
}