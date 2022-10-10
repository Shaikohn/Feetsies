import React from "react";
import CheckoutForm from "../../Features/CheckoutForm/CheckoutForm";
import styles from "./ProductDetails.module.css"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import { useModal } from "../../Features/Modals/useModal";
import Modals from "../../Features/Modals/Modals";
import "../../Features/Modals/Modals.css"
import Button from '@mui/material/Button';

const stripePromise = loadStripe("pk_test_51LpgGdIsUHqf6y0peEPMdjCDcsjuA2sdBcEGka27crrsnZrTLBpIdJZiAICPkWXYWeJzwabRyk2WtbH0yfdxmGFy0046Eu9UuK")

export default function ProductDetails({product}) {

    const [isOpenModal, openedModal, closeModal] = useModal(false);

    return (
        <Elements stripe={stripePromise} >
            <div className={styles.detailsBackground} key={product?.id}>
                <div>
                    <div>
                        <img className={styles.mainImg} src={product?.image} alt="" width="200px" height="250px" />
                    </div>
                    <div className={styles.infoContainer}>
                        <h1 className={styles.name}>{`${product?.name}`}</h1>
                        <h2 className={styles.price}>{`$${product?.price}`}</h2>
                        <h2>{`Stock: ${product?.stock}`}</h2>
                        <h2>{`${product?.description}`}</h2>
                    </div>
                    <Button
                    size="small"
                    variant="outlined"
                    onClick={openedModal}
                >Buy</Button>
                    <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
                        <h2 className="modalTitle">MAKE YOUR PURCHASE WITH YOUR CREDIT CARD!</h2>
                            <div>
                                <img src={product?.image} alt="" width="200px" height="200px" />
                            </div>
                            <div className={styles.buyInputs}>
                                <CheckoutForm product={product} />
                            </div>  
                            <div>
                                <button className="modalClose" onClick={closeModal}>
                                    CLOSE
                                </button>
                            </div>
                    </Modals>
                    
                        {/* <button>Add to Cart</button> */}
                </div>
            </div>
            </Elements>
    )
};