const { User } = require("../../db.js");
const bcrypt = require("bcryptjs");
const { sendConfirmationEmail } = require("../emails/index.js");
const { tokenSign } = require("../../utils/User/generateToken.js");

async function createUser(req, res) {
  const { email, password, location, name, lastName } = req.body;
  try {
    if (email && password) {
      const hashPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
        name,
        lastName,
        email: email,
        password: hashPassword,
        location,
      });
      const token = await tokenSign(user);
      User.update(
        {
          confirmationCode: token,
        },
        { where: { email: email } }
      );
      console.log(token);
      sendConfirmationEmail(name, email, token);
      return res.status(200).send({
        message: "User was registered successfully! Please check your email",
        token,
      });
    } else {
      throw new Error("Complete both fields");
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
}

module.exports = {
  createUser,
};
