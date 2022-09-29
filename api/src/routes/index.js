const { Router } = require('express');
const animal = require('./animal')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/animals', animal )

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
