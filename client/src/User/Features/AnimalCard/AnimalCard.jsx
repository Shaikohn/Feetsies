import React from "react";
import { Link } from "react-router-dom";
import ".AnimalCard.module.css";

export default function AnimalCard({id, name, main_image, sex, size}) {

    return (
        <Link to={`/home/${id}`} className="link">
            <div className="animal-card">
                <h2 className="animal-name">{`Nombre: ${name}`}</h2>
                <div>
                    <img className="main-img" src={main_image} alt="" width="200px" height="250px" />
                </div>
                <h3 className="animal-sex">{`Sexo: ${sex}`}</h3>
                <h3 className="animal-size">{`Tamaño: ${size}`}</h3>
            </div>
        </Link>
    )
};