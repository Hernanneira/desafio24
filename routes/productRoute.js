const {Router} = require('express');
const passport = require('passport');
const router = Router();
const productosController = require('../controllers/ContenedorProductos')
const logger = require('../utils/log4js')


router.get('/',  async (req, res, next) =>{
        try{
            logger.info(`Se intentó acceder a ${req.url} con método ${req.method} exitosamente`);
        const productos = await productosController.getAll()
        if (!productos) {
            logger.error('no se pudo traer productos')
        }
        res.render('index.ejs',{productos, nombre: req.session.passport.user }) 
        }catch (err) {
            console.log(err)
            logger.error(`no se pudo acceder a a ${req.url} con método ${req.method}`)
        }
        
    })

module.exports = router;