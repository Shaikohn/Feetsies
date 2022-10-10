const Stripe = require('stripe')
const { STRIPE_KEY } = process.env;

const stripe = new Stripe(STRIPE_KEY)

async function receivePayment(req, res) {
    try {
        const { id, amount, description } = req.body

    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description,
        payment_method: id,
        confirm: true
    })
    /* if(error) {
        throw new Error(error.raw.message)
    } */
    console.log(payment)
    res.send({message: 'Succesfull payment'})
    }
    catch(error) {
        console.log(error)
        return res.status(400).send(error.raw.message);
    }
}

module.exports = {
    receivePayment
}