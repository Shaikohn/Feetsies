const { Router } = require('express');
const router = Router();
const {
    getAllProducts,
    getDetail,
    createProduct,
    searchProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/Product.controller')

const {getAllTypes} = require('../controllers/Product_type.controller')

router.get('/all',getAllProducts);

router.get('/search',searchProducts);

router.get('/types',getAllTypes);
//
router.get('/:id',getDetail)

router.post('/create',createProduct)

router.put('/update/:id',updateProduct)

router.delete('/delete/:id',deleteProduct)


module.exports = router;