import {Link, useNavigate} from "react-router-dom";
import React, { useState }/* , { useState } */ from "react";
import styles from "./AnimalDetails.module.css"
import Button from "@mui/material/Button";
import { useModal } from "../../Features/Modals/useModal";
import Modals from "../../Features/Modals/Modals";
import "../../Features/Modals/Modals.css"
import profileIcon from "./profileIcon.jpg"

/* import images from "./images"; */

/* LAS COSAS COMENTADAS SON NECESARIAS POR SI EN ALGÚN MOMENTO SE LE AGREGAN 
MAS IMAGENES A LOS DETALLES DE LOS PERROS */

export default function AnimalDetails({animal}) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [isNotLogged, openedLoggedModal, closeLoggedModal] = useModal(false);
    const navigate = useNavigate();

    /* const [selectedImg, setSelectedImg] = useState(images[0]) */

    return (
            <div className={styles.detailsBackground} key={animal?.id}>
                    {/* <div className={styles.imagesContainer}>
                        <img className={styles.selected} src={selectedImg} alt="" />
                        <div className={styles.notSelected}>
                            {
                                images.map((img, i) => (
                                    <img 
                                    style={{border: selectedImg === img ? "4px solid purple": ""}}
                                    key={i} 
                                    src={img} 
                                    alt="dog"
                                    onClick={() => setSelectedImg(img)}
                                    />
                                ))
                            }
                        </div>
                    </div> */}
                    <div>
                        
                        <img alt={animal?.name} className={styles.mainImg} src={animal?.main_image} />
                    </div> 
                    <div className={styles.infoContainer}>
                        <h1 className={styles.name}>{`${animal?.name}`}</h1>
                        <h2 className={styles.info}>Size: {`${animal?.size}`} Sex: {`${animal?.sex}`}</h2>
                        <h2 className={styles.info}>{`${animal?.description}`}</h2>
                        <h2 className={styles.info}>{`Age: ${animal?.age}`}</h2>
                        <h2 className={styles.info}>{`Birth date: ${animal?.birth_date}`}</h2>
                        {
                            !user ? 
                            <div>
                            <Button
                                sx={{
                                    my: 2,
                                    display: "flex",
                                    ml:4,
                                    fontSize: 20,
                                    bgcolor: "black",
                                    fontWeight: 600,
                                    mx: 2,
                                }}
                                onClick={openedLoggedModal}
                                size="large"
                                variant="outlined">
                                    ADOPT ME! 💓
                            </Button>
                            <Modals isOpenModal={isNotLogged} closeModal={closeLoggedModal}>
                        <h2 className="modalTitle" color="black">YOU HAVE TO BE LOGGED TO REQUEST ADOPTIONS!</h2>
                            <div>
                                <img src={profileIcon} alt="" width="200px" height="200px" />
                            </div>
                            <div>
                                <button className="modalConfirm" onClick={() => {navigate("/signUp")}}>
                                    SIGN UP!
                                </button>
                                <button className="modalClose" onClick={() => {closeLoggedModal()}}>
                                    CLOSE
                                </button>
                            </div>
                    </Modals>
                            </div> :
                            <Link to={`/home/animals/${animal?.id}/adoption`}>
                            <Button
                                sx={{
                                    my: 2,
                                    display: "flex",
                                    ml:4,
                                    fontSize: 20,
                                    bgcolor: "black",
                                    fontWeight: 600,
                                    mx: 2,
                                }}
                                size="large"
                                variant="outlined">
                                    ADOPT ME! 💓
                            </Button>
                        </Link>
                        } 
                        {/* <div>
                            <button>Request adoption</button>
                        </div> */}
                    </div>
            </div>
    )
};