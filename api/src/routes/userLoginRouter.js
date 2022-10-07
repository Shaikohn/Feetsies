const { Router } = require("express");
const userLoginRouter = Router();

const { createUser } = require("../controllers/User/CreateUser.js");
const { loginUser } = require("../controllers/User/LoginUser.js");
const { verifyUser } = require("../controllers/User/verifyUser.js");

const { validateCreateUser } = require("../utils/User/validateData.js");

userLoginRouter.post("/register", validateCreateUser, createUser);
userLoginRouter.get("/login", loginUser);
userLoginRouter.get("/confirm/:confirmationCode", verifyUser);

module.exports = userLoginRouter;
