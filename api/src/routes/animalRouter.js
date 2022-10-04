const {Router} = require('express')
const {
    addAlta,
    deleteAlta,
    getAltaDetail
} = require('../controllers/Adoption_alta.controller')
const {
    addPetition,
    deletePetition,
    getPetitionDetail
} = require('../controllers/Adoption_petition.controller')
const {
    getAllAnimals,
    getAnimalDetail,
    createAnimal,
    delateAnimal,
    searchAnimal,
    updateAnimal
} = require('../controllers/Animal.controller')
const { getAllTypes } = require('../controllers/Animal_type.controller')
const router = Router()
//
router.get('/', getAllAnimals);
router.post('/', createAnimal);
router.get('/types', getAllTypes);
router.get('/search', searchAnimal);
router.get('/:id', getAnimalDetail);
router.delete('/:id', delateAnimal);
router.put('/:id', updateAnimal);
router.post('/take',addPetition)
router.get('/take/:id',getPetitionDetail)
router.delete('/take',deletePetition)
router.post('/give',addAlta)
router.delete('/give',deleteAlta)
router.get('/give/:id',getAltaDetail)


module.exports = router