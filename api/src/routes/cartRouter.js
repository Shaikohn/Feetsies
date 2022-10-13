const { Router } = require('express');
const router = Router();
const {
    addCart,
    deleteOneFromCart,
    deleteWholeCart,
    getCart,
    updateItem
} = require('../controllers/Shop/shopCart.controller')

const {
    addPurchaseOrder,
    getPurchaseOrderById,
    getPOByUserId
} = require('../controllers/Shop/Purchase_order.controller')

router.get('/get/:id',getCart)

router.delete('/clear/:id',deleteWholeCart)

router.delete('/remove/:id',deleteOneFromCart)

router.post('/save',addPurchaseOrder)

router.get('/getorder/:orderid',getPurchaseOrderById)

router.get('/getuserorders/:userid',getPOByUserId)

router.put('/updateitem',updateItem)

router.post('/additem',addCart)





module.exports = router;