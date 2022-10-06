const { Router } = require('express');
const router = Router();
const {
    deleteOneFromCart,
    deleteWholeCart,
    getCart
} = require('../controllers/Shop/Cart.controller')

const {
    addPurchaseOrder
} = require('../controllers/Shop/Purchase_order.controller')

/*const {
    addToCart
} = require ('../controllers/Shop/Cart.controller')*/

//router.post('/tocart',addToCart)

router.get('/get/:id',getCart)

router.delete('/clear/:id',deleteWholeCart)

router.get('/remove/:id',deleteOneFromCart)

router.post('/save',addPurchaseOrder)

module.exports = router;