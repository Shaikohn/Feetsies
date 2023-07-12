import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import styles from "./ShoppingCheckout.module.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeWholeCart } from "../../../redux/actions/shoppingCartA.js";
import { getShoppingCart } from "../../../redux/actions/ShoppingCartView.js";
import Swal from 'sweetalert2'
import Spinner from '../../Features/CheckoutForm/Spinner';
import { postPurchaseOrder } from '../../../redux/actions/purchaseOrderAction';
import { useNavigate } from 'react-router-dom';
import { useReducer } from 'react';

export default function ShoppingCheckout() {

    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const { shoppingCartCopy } = useSelector((state) => state.getShoppingCart)
    const dispatch = useDispatch();
    const [userId, setUserId] = useState(JSON.parse(localStorage?.getItem('profile')).data.id);
    const navigate = useNavigate()
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        dispatch(getShoppingCart(userId));
    }, [reducerValue]);

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
                const {data} = await axios.post('/api/checkout', {
                id,
                amount: shoppingCartCopy.total * 100,
                /* description: product.description */
            })
            setLoading(false)
            /* product.stock-- */
            elements.getElement(CardElement).clear()
            await axios.post('/cart/save', {
                prods: shoppingCartCopy,
                userId,
            })
            handleClearCart(e)
            navigate("/home/products")
            forceUpdate()
            Swal.fire({
                title: 'Payment done', 
                text: data.message, 
                icon: 'success',
                timer: 5000
            });
            }
            catch(error) {
                elements.getElement(CardElement).clear()
                Swal.fire({
                    title: 'Payment failed', 
                    text: error.response.data, 
                    icon: 'error',
                    timer: 5000
                });
                setLoading(false)
            }
        }
    setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
                <CardElement className={styles.buyInputs} />
                {loading ? 
                <Spinner />
            : 
            <div>
            <button type='submit' className={styles.buyButton}>
                CONFIRM
            </button>
            </div>
            }
        </form>
    )
}