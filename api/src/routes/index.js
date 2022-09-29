const { Router } = require('express');
const animal = require('./animal');
const productRouter = require('./productRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/animals', animal );
router.use('/products', productRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
