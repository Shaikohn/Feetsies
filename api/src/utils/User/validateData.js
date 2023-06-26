const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const { User } = require("../../db.js");

const validateCreateUser = [
  body("email")
    .isEmail()
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          throw Error("E-mail already in use");
        }
      });
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = {
  validateCreateUser,
};
