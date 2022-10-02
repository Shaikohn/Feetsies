import React/* , { useState } */ from "react";
import styles from "./AnimalDetails.module.css"
/* import images from "./images"; */

/* LAS COSAS COMENTADAS SON NECESARIAS POR SI EN ALGÚN MOMENTO SE LE AGREGAN 
MAS IMAGENES A LOS DETALLES DE LOS PERROS */

export default function AnimalDetails({animal}) {

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
                        <h2>{`${animal?.size} ${animal?.sex}`}</h2>
                        <h2>{`${animal?.description}`}</h2>
                        <h2>{`Age: ${animal?.age}`}</h2>
                        <h2>{`Birth date: ${animal?.birth_date}`}</h2>
                        {/* <div>
                            <button>Request adoption</button>
                        </div> */}
                    </div>
            </div>
    )
};