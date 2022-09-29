const { Router } = require('express');
const router = Router();
const {getProducts,getDetail} = require('../controllers/Product.controller')
const {getTypes} = require('../controllers/Product_type.controller')

router.use('/getAll',async (req,res)=>{
    if(!req.query.str){
        res.send(await getProducts());
    }else{
        res.send(await getProducts(req.query.str));
    }
    return;
})

router.use('/types',async (req,res)=>{
    let info = await getTypes();
    info = info.map(e=>e.dataValues.name)
    res.send(info)
    return;
})

router.use('/:id',async (req,res)=>{
    if(!req.params.id){
        res.send('Bad request')
    }
    let info = await getDetail(req.params.id);
    res.send(info)
    return;
})

/*router.use('/getOne',async (req,res)=>{
    
    if(!req.query.str){
        res.status(400).send('Not Found, query value absent');
    }else{
        res.send(await getOneProduct(req.query.id));
    }
    return;
})*/


module.exports = router;