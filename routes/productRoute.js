const {Router} = require('express');
const routeProducts = Router();
const logger = require('../utils/log4js')
let cartProducts = []

routeProducts.get('/',  async (req, res, next) =>{
    logger.info(`Se intentó acceder a api/productos ${req.url} con método ${req.method} exitosamente`);
    res.render('index.ejs',{ nombre: req.session.passport.user }) 
    })

routeProducts.post('/', async (req, res, next) => {
    console.log('hola prodcut ROute')
    cartProducts = req.body
    console.log(cartProducts)
})

module.exports = {
    routeProducts,
    cartProducts
}