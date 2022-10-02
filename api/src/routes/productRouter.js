const { Router } = require('express');
const router = Router();
const {
    getAllProducts,
    getDetail,
    createProduct,
    searchProducts,
    updateProduct
} = require('../controllers/Product.controller')

const {getAllTypes} = require('../controllers/Product_type.controller')

router.get('/getAll',async (req,res)=>{
    if(!req.query.str){
        res.send(await getAllProducts());
    }else{
        res.send(await getAllProducts(req.query.str));
    }
    return;
})

router.get('/all',getAllProducts);

router.get('/search',searchProducts);

router.get('/types',getAllTypes);
//
router.get('/:id',getDetail)

router.post('/create',createProduct)

router.put('/update/:id',updateProduct)


module.exports = router;