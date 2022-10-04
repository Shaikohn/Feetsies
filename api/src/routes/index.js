const { Router } = require('express');
const productRouter = require('./productRouter')
const animalRouter = require('./animalRouter')
const adminRouter = require('./administrationRouter')
const userRouter = require('./userRouter')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.use('/animals', animalRouter);
router.use('/products', productRouter);
router.use('/admin', adminRouter);
router.use('/users', userRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
