const { Router } = require('express');
const router = Router();
const {getProducts} = require('../controllers/Product.controller')

router.use('/getAll',async (req,res)=>{
    if(!req.query.str){
        res.send(await getProducts());
    }else{
        res.send(await getProducts(req.query.str));
    }
    return;
})


module.exports = router;