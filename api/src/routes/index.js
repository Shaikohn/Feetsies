const { Router } = require("express");
const productRouter = require("./productRouter");
const animalRouter = require("./animalRouter");
const adminRouter = require("./administrationRouter");
const userRouter = require("./userRouter");
const userLoginRouter = require("./userLoginRouter.js");
const emailsRouter = require("./emailsRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/animals", animalRouter);
router.use("/products", productRouter);
router.use("/admin", adminRouter);
router.use("/users", userRouter);
router.use("/user/auth/", userLoginRouter);
router.use("/emails", emailsRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
