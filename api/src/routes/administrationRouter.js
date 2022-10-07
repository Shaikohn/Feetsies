const { Router } = require('express');
const router = Router();

const {
    addInquiry,
    deleteInquiry,
    getAllInquiries,
    getInquiryDetail,
    setInquiryAsRead,
    toggleImportantInquiry
} = require('../controllers/Admin/Inquiry.controller')

const {
    addUser,
    deleteUser,
    getAllUsers,
    toggleAdmin,
    togglebanUser,
} = require('../controllers/Admin/User.controller')

const {
    deleteAlta,
    getAllAltas,
    getAltaDetail,
    setAltaAsRead,
    toggleImportantAlta
} = require('../controllers/Animals/Adoption_alta.controller')

const {
    getAllPetitions,
    getPetitionDetail,
    deletePetition
} = require('../controllers/Animals/Adoption_petition.controller')


router.post('/inquiry',addInquiry)
router.get('/getinquiries',getAllInquiries)
router.get('/inquiry/:id',getInquiryDetail)
router.put('/inquiry/setread/:inquiryid',setInquiryAsRead)
router.put('/inquiry/toggleimportant/:inquiryid',toggleImportantInquiry)
router.delete('/inquiry',deleteInquiry)

router.get('/getaltas',getAllAltas)
router.get('/altadetail/:altaid',getAltaDetail)
router.put('/alta/setread/:altaid',setAltaAsRead)
router.put('/alta/toggleimportant/:altaid',toggleImportantAlta)
router.delete('/alta/:altaid',deleteAlta)

router.get('/getpetitions',getAllPetitions)
router.get('/petition/:petitionid',getPetitionDetail)
router.delete('/petition/:petitionid',deletePetition)

router.post('/user',addUser)
router.get('/getallusers',getAllUsers)
router.put('/toggleban/:userid',togglebanUser)
router.put('/toggleadmin',toggleAdmin)
router.delete('/user/:id',deleteUser)





module.exports = router;