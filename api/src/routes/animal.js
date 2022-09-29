const {Router} = require('express')
const{ getAllAnimals, getAnimalDetail, createAnimal} = require('../controllers/animal')
const{getTypes} = require('../controllers/Animal_type.controller')

const router = Router()


router.get('/', getAllAnimals)
router.get('/types',getTypes)
router.get('/:id', getAnimalDetail)



module.exports = router