const { Router } = require('express');
const router = Router();

router.use('/getAll',(req,res)=>{
    if(!req.query.str){
        res.send('return all products');
    }else{
        res.send('return products that match that string');
    }
    return;
})


module.exports = router;