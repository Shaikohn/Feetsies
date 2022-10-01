const {Router} = require('express')
const{ getAllAnimals, getAnimalDetail, createAnimal, delateAnimal, searchAnimal} = require('../controllers/animal')
const{getTypes} = require('../controllers/Animal_type.controller')
const router = Router()

router.get('/', getAllAnimals);
router.post('/', createAnimal)
router.get('/types',getTypes)
router.get('/search', searchAnimal)
router.get('/:id', getAnimalDetail)
router.delete('/:id', delateAnimal)


module.exports = router