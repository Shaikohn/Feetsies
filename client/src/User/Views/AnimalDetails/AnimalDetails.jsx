import React/* , { useState } */ from "react";
import styles from "./AnimalDetails.module.css"
/* import images from "./images"; */

/* LAS COSAS COMENTADAS SON NECESARIAS POR SI EN ALGÚN MOMENTO SE LE AGREGAN 
MAS IMAGENES A LOS DETALLES DE LOS PERROS */

export default function AnimalDetails({animal}) {

    /* const [selectedImg, setSelectedImg] = useState(images[0]) */

    return (
            <div key={animal?.id}>
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
                        <h2>{`Name: ${animal?.name}`}</h2>
                        <h3>{`Sex: ${animal?.sex}`}</h3>
                        <h3>{`Size: ${animal?.size}`}</h3>
                        <h3>{`Description: ${animal?.description}`}</h3>
                        <h3>{`Age: ${animal?.age}`}</h3>
                        <h3>{`Birth date: ${animal?.birth_date}`}</h3>
                        <div>
                            <button>Request adoption</button>
                        </div>
                    </div>
            </div>
    )
};