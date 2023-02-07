const {Router} = require('express');
const router = Router();
const productosController = require('../controllers/ContenedorProductos')
const logger = require('../api/log4js')



router.get('/',  async (req, res, next) =>{
        try{
           logger.info(`Se intentó acceder a ${req.url} con método ${req.method} exitosamente`);
        console.log('ROUTE INDEX GET API/Prod usan GETALLMONGO PRODUCTOS********')
        console.log('REQ.SESSION///////////////////',req.session)
        const productos = await productosController.getAll()
        if (!productos) {
            logger.error('no se pudo traer productos')
        }
        res.render('pages/index',{productos, nombre: "hernan" }) 
        }catch (err) {
            console.log(err)
            logger.error(`no se pudo acceder a a ${req.url} con método ${req.method}`)
        }
        
    })

module.exports = router;