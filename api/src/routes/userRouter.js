const { Router } = require('express');
const router = Router();

const {
    addUser,
    deleteOneFromCart,
    deleteUser,
    deleteWholeCart,
    getUserDetail,
    getCart,
    updateUser,
} = require('../controllers/Admin/User.controller')


router.delete('/:id',deleteUser);
router.post('/create',addUser);
router.put('/update', updateUser);
router.get('/:id', getUserDetail);
router.get('/cart/:id', getCart);
router.delete('/cart/:id', deleteOneFromCart);
router.delete('/cart/whole/:id', deleteWholeCart);


module.exports = router;