const { Router } = require('express');
const router = Router();

const {
    addUser,
    deleteUser,
    updateUser,
    getUserDetail
} = require('../controllers/Admin/User.controller')


router.delete('/:id',deleteUser);
router.post('/create',addUser);
router.put('/update', updateUser);
router.get('/:id', getUserDetail);


module.exports = router;