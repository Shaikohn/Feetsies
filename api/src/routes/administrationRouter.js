const { Router } = require('express');
const router = Router();

const {
    addInquiry,
    deleteInquiry,
    getInquiryDetail
} = require('../controllers/Inquiry.controller')


router.post('/inquiry',addInquiry)
router.delete('/inquiry',deleteInquiry)
router.get('/inquiry/:id',getInquiryDetail)


module.exports = router;