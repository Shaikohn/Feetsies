const { where } = require("sequelize");
const { User } = require("../../db");

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

const bcrypt = require("bcryptjs");

async function addUser(req, res) {
  if (!req.body.email || !req.body.password)
    return res.status(400).send(badReq);
  let newRow = {
    email: req.body.email,
    password: req.body.password,
    phone_number: req.body.phone_number,
    location: req.body.location,
  };
  try {
    let user = await User.create(newRow);
    if (!user)
      return res
        .status(500)
        .send({ err: "An error ocurred while creating user..." });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function deleteUser(req, res) {
  if (!req.params.id) return res.status(400).send(badReq);
  try {
    let user = await User.destroy({ where: { id: req.params.id } });
    if (!user) return res.status(404).send(notFound);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function updateUser (req, res) {
  let { id, password, phone_number, location,name,lastName,image } = req.body;
  try {
    let user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (user.length === 0 || !user) {
      return res.status(404).send(notFound);
    } else {
      if (name) user.name = name;
      if (lastName) user.lastName = lastName;
      if (password){
        const hashPassword= await bcrypt.hash(password, 8);
        user.password = hashPassword;
      } 
      if (phone_number) user.phone_number = phone_number;
      if (location) user.location = location;
      if (image) user.image = image;
      user.save();
      return res.status(200).send("User Updated.");
    }
  } catch (error) {
    return res.status(500).send(errorVar);
  }
}

async function getUserDetail(req, res) {
  if (!req.params.id) return res.status(400).send(badReq);
  try {
    let user = await User.findOne({ where: { id: req.params.id } });
    if (!user) return res.status(404).send(notFound);
    result = {
      id: user.dataValues.id,
      name: user.dataValues.name,
      lastName:  user.dataValues.lastName,
      isAdmin:  user.dataValues.isAdmin,
      image:  user.dataValues.image,
      email: user.dataValues.email,
      phoneNumber: user.dataValues.phone_number,
      location: user.dataValues.location,
    };
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function getAllUsers(req, res) {
  try {
    let users = await User.findAll();
    if (!users || users.length < 1) return res.status(500).send(emptyDB);
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function togglebanUser(req, res) {
  const { userid } = req.params;
  try {
    let user = await User.findOne({ where: { id: userid } });
    if (!user) return res.status(404).send(notFound);
    if (user.isAdmin)
      return res
        .status(400)
        .send({ err: "Can not ban Admins. Remove admin privileges first." });
    let valor;
    if (user.isBan) {
      valor = false;
    } else {
      valor = true;
    }
    console.log(user.dataValues.isBan);
    const dato = await User.update(
      { isBan: valor },
      {
        where: { id: userid },
      }
    );
    console.log(user.dataValues.isBan);
    return res.status(200).send({ success: "User Ban status changed" });
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function toggleAdmin(req, res) {
  const { userid } = req.params;
  try {
    let user = await User.findOne({ where: { id: userid } });
    if (!user) return res.status(404).send(notFound);
    /* if (user.isAdmin)
      return res
        .status(400)
        .send({ err: "Can not ban Admins. Remove admin privileges first." }); */
    let valor;
    if (user.isAdmin) {
      valor = false;
    } else {
      valor = true;
    }
    console.log(user.dataValues.isAdmin);
    const dato = await User.update(
      { isAdmin: valor },
      {
        where: { id: userid },
      }
    );
    console.log(user.dataValues.isAdmin);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {
  addUser,
  deleteUser,
  getAllUsers,
  getUserDetail,
  toggleAdmin,
  togglebanUser,
  updateUser,
};
