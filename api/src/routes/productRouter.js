const { Router } = require('express');
const router = Router();

router.use('/getAll',(req,res)=>{
    res.send('return all products');
    return;
})

router.use('/getByString',(req,res)=>{
    res.send('return products by string');
    return;
})

module.exports = router;