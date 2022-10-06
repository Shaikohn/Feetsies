const { Router } = require('express');
const router = Router();

const {
    addInquiry,
    deleteInquiry,
    getInquiryDetail
} = require('../controllers/Admin/Inquiry.controller')

const {
    addUser,
    deleteUser,
    getAllUsers,
    togglebanUser
} = require('../controllers/Admin/User.controller')


router.post('/inquiry',addInquiry)
router.delete('/inquiry',deleteInquiry)
router.get('/inquiry/:id',getInquiryDetail)
router.post('/user',addUser)
router.delete('/user/:id',deleteUser)
router.get('/getallusers',getAllUsers)
router.put('/toggleban/:userid',togglebanUser)


module.exports = router;