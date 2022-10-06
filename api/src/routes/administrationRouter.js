const { Router } = require('express');
const router = Router();

const {
    addInquiry,
    deleteInquiry,
    getAllInquiries,
    getInquiryDetail
} = require('../controllers/Admin/Inquiry.controller')

const {
    addUser,
    deleteUser,
    getAllUsers,
    toggleAdmin,
    togglebanUser,
} = require('../controllers/Admin/User.controller')

const {
    getAllAltas,
} = require('../controllers/Animals/Adoption_alta.controller')

const {
    getAllPetitions,
} = require('../controllers/Animals/Adoption_petition.controller')


router.post('/inquiry',addInquiry)
router.delete('/inquiry',deleteInquiry)
router.get('/inquiry/:id',getInquiryDetail)
router.get('/getinquiries',getAllInquiries)

router.get('/getaltas',getAllAltas)

router.get('/getpetitions',getAllPetitions)

router.post('/user',addUser)
router.delete('/user/:id',deleteUser)
router.get('/getallusers',getAllUsers)
router.put('/toggleban/:userid',togglebanUser)
router.put('/toggleadmin',toggleAdmin)


module.exports = router;