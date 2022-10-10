const emailsRouter = require("./emailsRouter");
const { Router } = require('express');
const productRouter = require('./productRouter')
const animalRouter = require('./animalRouter')
const adminRouter = require('./administrationRouter')
const userRouter = require('./userRouter')
const stripeRouter = require('./stripeRouter')
const cartRouter = require('./cartRouter')
const userLoginRouter = require('./userLoginRouter.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/animals', animalRouter);
router.use('/products', productRouter);
router.use('/admin', adminRouter);
router.use('/users', userRouter);
router.use('/api/checkout', stripeRouter)
router.use('/cart', cartRouter);
router.use('/user/auth/', userLoginRouter);
router.use("/emails", emailsRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
