const { Router } = require('express');
const router = Router();
const {
    getAllProducts,
    getDetail,
    createProduct,
    searchProducts
} = require('../controllers/Product.controller')

const {getAllTypes} = require('../controllers/Product_type.controller')

router.get('/getAll',async (req,res)=>{
    if(!req.query.str){
        res.send(await getProducts());
    }else{
        res.send(await getProducts(req.query.str));
    }
    return;
})

router.get('/all',getAllProducts);

router.get('/search',searchProducts);

router.get('/types',getAllTypes);
//
router.get('/:id',getDetail)

router.post('/create',createProduct)


module.exports = router;