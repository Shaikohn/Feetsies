const { User } = require("../../db.js");
const { response } = require("express");
const { tokenSign, verifyToken } = require("../../utils/User/generateToken.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendLinkResetPassword } = require("../emails/index.js");

const forgotPassword = async (req, res = response) => {
  const { email } = req.body;
  const searchUser = await User.findOne({
    where: {
      email,
    },
  });

  if (!searchUser) {
    return res.status(400).json({ status: "User Not Exists" });
  }

  const userName = searchUser.name;
  const userId = searchUser.id;

  const secret = process.env.JWT_SECRET_KEY + searchUser.password;

  //   const token = await tokenSign(searchUser);
  const token = jwt.sign(
    { email: searchUser.email, id: searchUser.id },
    secret,
    { expiresIn: "5m" }
  );

  const link = `https://pfgrupo3-n9dn35x47-pcardozo.vercel.app/reset-password/${searchUser.id}/${token}`;

  sendLinkResetPassword(userName, email, link);

  console.log(link);

  res.status(201).json(searchUser);
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;

  try {
    const searchUser = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!searchUser) {
      return res.status(400).json({ status: "User Not Exists" });
    }

    const secret = process.env.JWT_SECRET_KEY + searchUser.password;

    try {
      const verify = jwt.verify(token, secret);
      console.log("Verified");
      res.status(201).json({
        status: "Verified",
        user: searchUser.name,
      });
    } catch (error) {
      console.log("not verify", error);
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json("something was wrong");
  }

  //   console.log(req.params);
  //   res.send("done");
};

const postResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password, passwordConfirmation } = req.body;

  const searchUser = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!searchUser) {
    return res.status(400).json({ status: "User Not Exists" });
  }

  const secret = process.env.JWT_SECRET_KEY + searchUser.password;

  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 8);
    await User.update(
      {
        password: encryptedPassword,
      },
      { where: { id: id } }
    );
    res.send({ status: "Password Updated" });
    // console.log("Verified");
  } catch (error) {
    // res.send("NOt verify");
    // console.log("not verify");
    console.log(error);
    res.status(500).json("Something was wrong");
  }
};

module.exports = { forgotPassword, resetPassword, postResetPassword };
