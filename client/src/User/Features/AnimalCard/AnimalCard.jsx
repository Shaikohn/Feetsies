import React from "react";
import { Link } from "react-router-dom";
import "./AnimalCard.module.css";

export default function AnimalCard({id, name, main_image, sex, size}) {

    return (
        <Link to={`/animals/${id}`} className="link">
            <div className="animal-card">
                <div>
                    <h2 className="animal-name">{`Name: ${name}`}</h2>
                    <div>
                        <img className="main-img" src={main_image} alt="" width="200px" height="250px" />
                    </div>
                    <h3 className="animal-sex">{`Sex: ${sex}`}</h3>
                    <h3 className="animal-size">{`Size: ${size}`}</h3>
                </div>
            </div>
        </Link>
    )
};