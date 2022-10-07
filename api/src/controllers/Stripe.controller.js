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
    console.log(payment)
    res.send({message: 'Succesfull payment'})
    }
    catch(error) {
        console.log(error)
        res.json({message: error.raw.message})
    }
}

module.exports = {
    receivePayment
}