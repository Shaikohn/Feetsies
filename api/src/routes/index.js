const { Router } = require('express');
const productRouter = require('./productRouter')
const animalRouter = require('./animal')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();



router.use('/products', productRouter);
router.use('/animals', animalRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
