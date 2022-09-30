const { Router } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const router = Router();

const {getProducts,getDetail,createProduct} = require('../controllers/Product.controller')
const {getTypes} = require('../controllers/Product_type.controller')

router.get('/getAll',async (req,res)=>{
    if(!req.query.str){
        res.send(await getProducts());
    }else{
        res.send(await getProducts(req.query.str));
    }
    return;
})

router.get('/types',async (req,res)=>{
    let info = await getTypes();
    info = info.map(e=>e.dataValues.name)
    res.send(info)
    return;
})
//
router.use('/:id',async (req,res)=>{
    if(!req.params.id){
        res.send('Bad request')
    }
    let info = await getDetail(req.params.id);
    res.send(info)
    return;
})

/*router.use('/:id',async (req,res)=>{
    if(!req.params.id){
        res.send('Bad request')
    }
    let info = await getDetail(req.params.id);
    res.send(info)
    return;
})*/

router.post('/create',async (req,res)=>{
    console.log('this is the request body',req.body);
    const {name,description,price} = req.body;
    const {stock,image,productTypes,animalTypes}=req.body;
    let obj = {name,description,price}
    if(stock) obj.stock=stock;
    if(image) obj.image=image;
    if(!productTypes || productTypes.length>0){
        obj.productTypes=['Other'];
    }else{
        obj.productTypes=productTypes;
    }
    if(!animalTypes ||animalTypes.length>0){
        obj.animalTypes=['Other'];
    }else{
        obj.animalTypes=animalTypes;
    }
    let newReg = await createProduct(obj);
    res.send(newReg);
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