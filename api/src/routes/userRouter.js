const { Router } = require('express');
const router = Router();

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

router.delete('/:id',deleteUser);
router.post('/create',addUser);
router.put('/update', updateUser);
router.get('/:id', getUserDetail);
router.get('/cart/:id', getCart);
router.get('/reviews/:userid', getMyReviews);
router.delete('/cart/:id', deleteOneFromCart);
router.delete('/cart/whole/:id', deleteWholeCart);




module.exports = router;