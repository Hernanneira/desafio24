const {Router} = require('express');
const router = Router();
const logger = require('../utils/log4js')

//http://localhost:8081/api/randoms?cant=1000

// router.get("/", (req, res) => {
//     logger.info("🔸Route: /api/randoms 🔸Method: GET ");
//     if (!req.query.cant) {
//         logger.error(
//             `🔸Route: /api/randoms 🔸Method: GET 🔸Error: cantidad no especificada`
//         );
//         res.status(400).send("Debe indicar la cantidad de números a generar");
//     } else {
//         const cant = req.query.cant;
//         const randoms = getRandom(cant);
//         res.send(randoms);
//     }
// });
router.get('/api/randoms', async (req, res, next) =>{
    logger.info(`Se intentó acceder a ${req.url} con método ${req.method} exitosamente`);
    const cant = req.query.cant || 100000000
    const child = fork('./api/calculo.js');
    child.send(cant);
    child.on('message', (suma) => {
        res.json(suma);
    })
})
module.exports = router;