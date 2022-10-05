const { Router } = require('express');
const router = Router();
const {
    addToCart,
    getAllProducts,
    getDetail,
    createProduct,
    searchProducts,
    updateProduct,
    deleteProduct,
} = require('../controllers/Products/Product.controller')

const {getAllTypes} = require('../controllers/Products/Product_type.controller')

router.get('/all',getAllProducts);

router.get('/search',searchProducts);

router.get('/types',getAllTypes);
//
router.get('/:id',getDetail)

router.post('/create',createProduct)

router.put('/update/:id',updateProduct)

router.delete('/:id',deleteProduct)

router.post('/tocart',addToCart)


module.exports = router;