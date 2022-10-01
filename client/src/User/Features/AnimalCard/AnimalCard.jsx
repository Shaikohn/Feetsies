import React from "react";
import { Link } from "react-router-dom";
import styles from "./AnimalCard.module.css";

export default function AnimalCard({id, name, main_image, sex, size}) {

    return (

        <Link to={`/home/animals/${id}`} className={styles.link}>
            <div className={styles.animCard} key={id}>
                <div className={styles.animContainer}>
                    <h2 className={styles.animName}>{`Name: ${name}`}</h2>
                    <div>
                        <img className={styles.animImg} src={main_image} alt="" width="200px" height="250px" />
                    </div>
                    <h3 className={styles.animSex}>{`Sex: ${sex}`}</h3>
                    <h3 className={styles.animSize}>{`Size: ${size}`}</h3>
                </div>
            </div>
        </Link>
    )
};