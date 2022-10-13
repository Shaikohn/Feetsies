import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearAnimalDetails, getAnimalDetails } from "../../../redux/actions/animalDetailsActions";
import AnimalDetails from "./AnimalDetails";
import loading from "./Img/Loading.gif";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import CardMedia from "@mui/material/CardMedia";

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
            <div>
                <ResponsiveAppBar />
            </div>
            {
                <div>
                {Object.keys(animal).length > 0 ? (
                    <AnimalDetails animal={animal} />
                    ) : (
                        <CardMedia component="img" image={loading}  alt="Loading..." 
                            sx={{
                                backgroundRepeat: "repeat",
                                margin: "auto",
                                width: "100%",
                                height: "100%"
                            }}
                        />
                    )
                }
                </div>
            }
        </div>
    )
}