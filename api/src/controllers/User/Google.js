const { User } = require("../../db.js");
const { response } = require("express");
const { googleVerify } = require("../../utils/User/google-verify");
const { tokenSign } = require("../../utils/User/generateToken");

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  console.log(id_token);

  try {
    const { name, lastName, email, image } = await googleVerify(id_token);

    //verificar si el correo ya existe en la db
    let usuario = await User.findOne({ where: { email: email } });

    if (!usuario) {
      // tengo que crearlo
      usuario = await User.create({
        name,
        lastName,
        email,
        image,
        password: ":P",
        google: true,
        status: "Active",
      });
    }

    // If user status is false or isBan
    if (usuario.isBan) {
      return res.status(401).json({
        msg: "This user is banned, contact an administrator if you want to request to be unbanned",
      });
    }

    //Generate JWT
    const token = await tokenSign(usuario);

    res.json({
      data: usuario,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { googleSignIn };
