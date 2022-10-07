const { Router } = require("express");
const { sendEmail, sendConfirmationEmail } = require("../controllers/emails");

const router = Router();

router.post("/send-email", sendConfirmationEmail);

module.exports = router;
