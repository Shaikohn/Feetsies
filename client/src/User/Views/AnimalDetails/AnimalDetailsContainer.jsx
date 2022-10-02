import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearAnimalDetails, getAnimalDetails } from "../../../redux/actions/animalDetailsActions";
import AnimalDetails from "./AnimalDetails";
import loading from "../ProductHome/Img/Loading.gif";
import styles from "../ProductHome/ProductHome.module.css";
import Header from "../../Features/Header/Header";

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
            <div className={styles.headerProd}>
                <Header />
            </div>
            {
                <div>
                {Object.keys(animal).length > 0 ? (
                    <AnimalDetails animal={animal} />
                    ) : (
                        <div>
                        <img className={styles.loading} src={loading} alt="Loading..." />
                    </div>
                    )
                }
                </div>
            }
        </div>
    )
}