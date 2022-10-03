const { Router } = require('express');
const router = Router();

const {
    deleteUser
} = require('../controllers/User.controller')

router.delete('/:id',deleteUser);


module.exports = router;