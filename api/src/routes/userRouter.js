const { Router } = require('express');
const router = Router();

const {
    addUser,
    deleteUser,
    updateUser,
    getUserDetail,
    getCart
} = require('../controllers/Admin/User.controller')


router.delete('/:id',deleteUser);
router.post('/create',addUser);
router.put('/update', updateUser);
router.get('/:id', getUserDetail);
router.get('/cart/:id', getCart);


module.exports = router;