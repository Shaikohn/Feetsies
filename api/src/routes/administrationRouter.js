const { Router } = require('express');
const router = Router();

const {
    addInquiry,
    deleteInquiry
} = require('../controllers/Inquiry.controller')


router.post('/inquiry',addInquiry)
router.delete('/inquiry',deleteInquiry)


module.exports = router;