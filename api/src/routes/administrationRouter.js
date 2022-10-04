const { Router } = require('express');
const router = Router();
const {addPetition} = require('../controllers/Adoption_petition.controller')
const {addInquiry,deleteInquiry} = require('../controllers/Inquiry.controller')

router.post('/give',addPetition)
router.post('/inquiry',addInquiry)
router.delete('/inquiry',deleteInquiry)


module.exports = router;