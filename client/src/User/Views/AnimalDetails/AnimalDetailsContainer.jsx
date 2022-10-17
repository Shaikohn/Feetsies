import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearAnimalDetails, getAnimalDetails } from "../../../redux/actions/animalDetailsActions";
import AnimalDetails from "./AnimalDetails";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";

import CardMedia from "@mui/material/CardMedia";
import { Paper } from "@mui/material";
import Image from "./Img/BgImg3.jpg";
import loading from "./Img/Loading.gif";


export default function AnimalDetailsContainer() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const animal = useSelector((state) => state.AnimalDetails.animalDetails);

    useEffect(() => {
        dispatch(getAnimalDetails(id))
        return () => {
            dispatch(clearAnimalDetails())
        }
    }, [dispatch, id])

    return (
        <Paper 
            elevation={0} 
            sx={{ 
                backgroundImage: `url(${Image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
            }}
        >   
            <ResponsiveAppBar />
            {
                <div>
                    {Object.keys(animal).length > 0 ? (
                        <AnimalDetails animal={animal} />
                        ) : (
                            <CardMedia component="img" image={loading}  alt="Loading..." 
                                sx={{
                                    margin: "auto",
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                        )
                    }   
                </div>
            }
        </Paper>
    )
};