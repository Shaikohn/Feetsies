import React from "react";
import Header from "../../Features/Header/Header.jsx";
import styles from "./Landing.module.css";

export default function Landing() {
    
    return (
        <div className="landing">
            <div className={styles.landingProd}>
                <Header />
            </div>
            <div className="landing-container">
                <div className="landing-title">
                    ANIMAL SHELTER NAME
                </div>
                <div className="landing-desc">
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti sed eius nam labore cum, dicta tenetur cumque enim quibusdam dolorum sapiente fugiat unde alias, aliquam, error facilis voluptatibus soluta! Reprehenderit.
                    </p>
                </div>
            </div>
        </div>
    )
};