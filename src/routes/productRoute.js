const {Router} = require('express');
const routeProducts = Router();
const logger = require('../utils/log4js')
// const cartProductosController = require('../controllers/ContenedorCartProducts')
const usersController = require('../controllers/ContenedorLoginMongo')

routeProducts.get('/',  async (req, res, next) =>{
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    res.render('index.ejs',{ nombre: req.session.passport.user }) 
    })

routeProducts.post('/', async (req, res, next) => {
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    const cart = req.body
    const cartProductsUser = await usersController.update(req.session.passport.user ,cart)
    const cartProductsAA = cartProductsUser.find(element => element.cart)
    const cartProducts = cartProductsAA.cart
    console.log(cartProducts)   
    // res.render('cart.ejs',{cartProducts})
})

module.exports = {
    routeProducts,
}