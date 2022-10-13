const { Router } = require("express");
const userLoginRouter = Router();

const { createUser } = require("../controllers/User/CreateUser.js");
const {
  forgotPassword,
  resetPassword,
  postResetPassword,
} = require("../controllers/User/forgotPassword.js");
const { loginUser } = require("../controllers/User/LoginUser.js");
const { verifyUser } = require("../controllers/User/verifyUser.js");

const { validateCreateUser } = require("../utils/User/validateData.js");

const { googleSignIn } = require("../controllers/User/Google");

userLoginRouter.post("/register", validateCreateUser, createUser);
userLoginRouter.post("/login", loginUser);
userLoginRouter.post("/google", googleSignIn);
userLoginRouter.post("/forgot-password", forgotPassword);
userLoginRouter.post("/reset-password/:id/:token", postResetPassword);
userLoginRouter.get("/reset-password/:id/:token", resetPassword);
userLoginRouter.get("/confirm/:confirmationCode", verifyUser);

module.exports = userLoginRouter;
