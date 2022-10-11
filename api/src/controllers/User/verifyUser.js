const { User } = require("../../db");

const verifyUser = async (req, res, next) => {
  const getUserByCode = await User.findOne({
    where: {
      confirmationCode: req.params.confirmationCode,
    },
  });
//detalle
  if (!getUserByCode) {
    return res.status(404).send({ message: "User Not found." });
  }
  getUserByCode.status = "Active";
  console.log(getUserByCode);
  await getUserByCode.save();
  res.send(getUserByCode);
};

module.exports = { verifyUser };
