import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearAnimalDetails, getAnimalDetails } from "../../../redux/actions/animalDetailsActions";
import AnimalDetails from "./AnimalDetails";

export default function AnimalDetailsContainer() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const animal = useSelector((state) => state.AnimalDetails.animalDetails) 
    console.log(animal)

    useEffect(() => {
        dispatch(getAnimalDetails(id))
        return () => {
            dispatch(clearAnimalDetails())
        }
    }, [dispatch, id])

    return (
        <div>
            {
                <AnimalDetails animal={animal} />
            }
        </div>
    )
}