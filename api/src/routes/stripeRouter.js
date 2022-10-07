const { Router } = require('express');
const router = Router();

const { receivePayment } = require('../controllers/Stripe.controller.js')

router.post('/', receivePayment);


module.exports = router;