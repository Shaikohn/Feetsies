const { Router } = require('express');
const router = Router();

const {
    getUserPetitions,
} = require('../controllers/Animals/Adoption_petition.controller')

const {
    addUser,
    deleteUser,
    getAllUsers,
    getUserDetail,
    updateUser,
} = require('../controllers/Admin/User.controller')

const {
    deleteOneFromCart,
    deleteWholeCart,
    getCart,
} = require('../controllers/Shop/shopCart.controller.js')

const {
    getMyReviews
} = require('../controllers/Products/Review.controller.js')

router.delete('/:id',deleteUser);
router.post('/create',addUser);
router.put('/update', updateUser);
router.get('/:id', getUserDetail);
router.get('/cart/:id', getCart);
router.get('/reviews/:userId', getMyReviews);
router.delete('/cart/:id', deleteOneFromCart);
router.delete('/cart/whole/:id', deleteWholeCart);
router.get('/petitions/:userid', getUserPetitions);




module.exports = router;