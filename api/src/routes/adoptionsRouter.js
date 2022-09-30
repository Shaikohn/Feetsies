const { Router } = require('express');
const router = Router();
const {addPetition} = require('../controllers/Adoption_petition.controller')

router.post('/give',async (req,res)=>{
    const userId = req.body.userId;
    const obj = {
        topic:req.body.topic,
        description:req.body.description
    }
    let aux = await addPetition(userId,obj);
    res.send(aux);
    return
})







module.exports = router;