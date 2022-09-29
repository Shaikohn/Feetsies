const {Router} = require('express')
const{ getAllAnimals, getAnimalDetail, createAnimal} = require('../controllers/animal')


const router = Router()


router.get('/', getAllAnimals)
router.get('/:id', getAnimalDetail)



module.exports = router