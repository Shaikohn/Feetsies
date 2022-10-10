const bcrypt = require("bcryptjs");
const { User } = require("../../db.js");
const { tokenSign } = require("../../utils/User/generateToken.js");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error(`email ${email} invalid or not found`);
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    const token = await tokenSign(user);

    if (!checkPassword) {
      throw new Error("contraseña invalida");
    }

    if (user.status === "Pending") {
      throw new Error("Pending Account. Please Verify Your Email!");
    }

    return res.status(200).send({
      data: user,
      token,
      msg: "User logged in successfully",
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

module.exports = {
  loginUser,
};
