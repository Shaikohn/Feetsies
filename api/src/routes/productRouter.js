const { Router } = require('express');
const router = Router();
const {
    getAllProducts,
    getDetail,
    createProduct,
    searchProducts,
    updateProduct,
    deleteProduct,
} = require('../controllers/Products/Product.controller')

/*const {
    addToCart
} = require ('../controllers/Shop/Cart.controller')*/

const {getAllTypes} = require('../controllers/Products/Product_type.controller')

//router.post('/tocart',addToCart)

router.get('/all',getAllProducts);

router.get('/search',searchProducts);

router.get('/types',getAllTypes);

router.get('/:id',getDetail)

router.post('/create',createProduct)

router.put('/update/:id',updateProduct)

router.delete('/:id',deleteProduct)





module.exports = router;