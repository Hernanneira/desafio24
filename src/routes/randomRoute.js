const {Router} = require('express');
const router = Router();
const logger = require('../utils/log4js')

router.get('/api/randoms', async (req, res, next) =>{
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    const cant = req.query.cant || 100000000
    const child = fork('./api/calculo.js');
    child.send(cant);
    child.on('message', (suma) => {
        res.json(suma);
    })
})
module.exports = router;