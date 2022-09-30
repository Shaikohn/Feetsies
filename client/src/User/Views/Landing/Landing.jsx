import React from "react";
import Header from "../../Features/Header/Header.jsx";

export default function Landing() {
    
    return (
        <div className="landing">
            <div className="landing-header">
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