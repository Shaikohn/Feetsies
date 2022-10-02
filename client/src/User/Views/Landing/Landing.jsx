import React from "react";
import Header from "../../Features/Header/Header.jsx";
import styles from './Landing.module.css';


export default function Landing() {
    
    return (
        <div className="landing">
            <div className={styles.landingProd}>
                <Header />
            </div>
            <div className={styles.landing_container}>
                <div className="landing-title">
                    <h1>FEETSIES</h1>
                </div>
                <div className="landing-desc">
                    <p>
                        Welcome to FEETSIES, your local animal shelter. Here, lost pets get to live and have a nice time while we look to get them a nice family to live with.
                    </p>
                    <br></br>
                    <h3>Our Mission</h3>
                    <p>
                        We care about animal rights and safety, just as you do. It is our mission to take care of lost animals and pets that are in unhealthy situations, or that can't live in their current home anymore. Our main goal is to get them a nice, loving home, where they can thrive and have a good life. 
                    </p>
                    <h3>Vision</h3>
                    <p>
                        We aim to be the biggest and most important domestic animal shelter in our community, because helping our furry/feathery/scaly friends is what drives our motivation to grow.
                    </p>
                    <h3>Values</h3>
                    <p>
                        Love, comprehension and service for our pets are the three main pillars on which we build our confidence and passion for what we do.
                    </p>
                    <h3>Adoptions</h3>
                    <p>
                        Our sweet, loving pets are waiting for you to take them home! If you are interested in adopting any of our available pets, get in touch with us and we can arrange a meeting, so you can give them the home they were waiting for for so long!
                    </p>
                    <h3>Support</h3>
                    <p>
                        We are an NGO committed to the health and safety of our local pets. As such, funding is always a tricky issue. You can support us by making donations, or even better, buying some of our products, made by animal specialists, and approved by our pets!
                    </p>
                </div>
            </div>
        </div>
    )
};