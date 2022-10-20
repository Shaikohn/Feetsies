import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import styles from "./CheckoutForm.module.css"
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import Spinner from './Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails } from '../../../redux/actions/productDetailsActions';

export default function CheckoutForm({product}) {
    const {id} = useParams()
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const {productDetails} = useSelector((state) => state.ProductDetails)
    const [userId, setUserId] = useState(JSON.parse(localStorage?.getItem('profile')).data.id);
    const navigate = useNavigate()
    console.log(userId)
    console.log(productDetails)
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        setLoading(true)

        if(!error && product.stock > 0) {
            const { id } = paymentMethod
            try {
                const {data} = await axios.post('/api/checkout', {
                id,
                amount: product.price * 100,
                description: product.description
            })
            setLoading(false)
            /* product.stock-- */
            await axios.post('/cart/save/one', {
                prods: productDetails,
                userId,
            })
            elements.getElement(CardElement).clear()
            navigate("/home/products")
            Swal.fire({
                title: 'Payment done', 
                text: data.message, 
                icon: 'success',
                timer: 5000
            });
            }
            catch(error) {
                Swal.fire({
                    title: 'Payment failed', 
                    text: error.response.data, 
                    icon: 'error',
                    timer: 5000
                });
                setLoading(false)
            }
        }
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