const { Router } = require('express');
const productRouter = require('./productRouter')
const animalRouter = require('./animalRouter')
const adminRouter = require('./administrationRouter')
const userRouter = require('./userRouter')
const stripeRouter = require('./stripeRouter')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.use('/animals', animalRouter);
router.use('/products', productRouter);
router.use('/admin', adminRouter);
router.use('/users', userRouter);
router.use('/api/checkout', stripeRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
