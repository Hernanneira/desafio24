const {Router} = require('express');
const router = Router();
const cartProductosController = require('../controllers/ContenedorCartProducts')
const logger = require('../utils/log4js')

router.get('/',  async (req, res, next) =>{
    try{
        logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
        const cartProductsUser = await cartProductosController.getCart(req.session.passport.user)
        const cartProductsAA = cartProductsUser.find(element => element.cart)
        const cartProducts = cartProductsAA.cart
        console.log(cartProducts)
    if (!cartProducts) {
        logger.error('no se pudo traer productos del carrito')
        res.json('no se pudo traer el carrito')
    }
    res.send(cartProducts)
    }catch (err) {
        console.log(err)
    }
})

router.post('/',  async (req, res, next) =>{
    try{
        logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
        const cartProductos = req.body
        const cartUser = {
            cart: cartProductos,
            user: req.session.passport.user
        }
        const cart = await cartProductosController.createCart(cartUser)
        console.log('cart',cart)
    if (!cart) {
        logger.error('no se pudo traer productos del carrito')
        res.json('no se pudo traer el carrito')
    }
    }catch (err) {
        console.log(err)
    }
    
})

module.exports = router;