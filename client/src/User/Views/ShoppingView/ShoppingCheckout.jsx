import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import styles from "./ShoppingCheckout.module.css"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeWholeCart } from "../../../redux/actions/shoppingCartA.js";
import { getShoppingCart } from '../../../redux/actions/ShoppingCartView';
import Swal from 'sweetalert2'

export default function ShoppingCheckout() {

    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const { shoppingCartCopy } = useSelector((state) => state.getShoppingCart)
    const dispatch = useDispatch();
    const [userId, setUserId] = useState(JSON.parse(localStorage?.getItem('profile')).data.id);

    function handleClearCart(e) {
        e.preventDefault();
        dispatch(removeWholeCart(userId));
        /* dispatch(dispatch(getShoppingCart(userId))); */
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        setLoading(true)

        if(!error) {
            const { id } = paymentMethod
            try {
                const {data} = await axios.post('http://localhost:3001/api/checkout', {
                id,
                amount: shoppingCartCopy.total * 100,
                /* description: product.description */
            })
            Swal.fire({
                title: 'Payment done', 
                text: data.message, 
                icon: 'success',
                timer: 5000
            });
            /* product.stock-- */
            elements.getElement(CardElement).clear()
            handleClearCart(e)
            }
            catch(error) {
                elements.getElement(CardElement).clear()
                Swal.fire({
                    title: 'Payment failed', 
                    text: error.response.data, 
                    icon: 'error',
                    timer: 5000
                });
            }
            setLoading(false)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
                <CardElement className={styles.buyInputs} />
            <button type='submit' className={styles.buyButton}>
                CONFIRM
            </button>
        </form>
    )
}