const { Router } = require('express');
const router = Router();

router.post('/give',async (req,res)=>{
    const userId = req.body.userId;
    const obj = {
        topic:req.body.topic,
        description:req.body.description
    }
})







module.exports = router;