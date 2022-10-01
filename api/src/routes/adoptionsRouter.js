const { Router } = require('express');
const router = Router();
const {addPetition} = require('../controllers/Adoption_petition.controller')

router.post('/give',addPetition)

module.exports = router;