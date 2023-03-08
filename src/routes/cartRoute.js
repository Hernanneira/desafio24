const {Router} = require('express');
const router = Router();
const cartProductosController = require('../controllers/ContenedorCartProducts')
const sendNewBuyEmail = require('../utils/newBuyEmail')
const sendNewbuySMS = require('../utils/newBuySMS')
const sendNewbuyWhatsApp = require('../utils/newBuyWhatsApp')
const logger = require('../utils/log4js')

router.get('/',  async (req, res, next) =>{
        try{
            logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
        res.render('cart.ejs',{user: req.session.passport.user})
        }catch (err) {
            console.log(err)
        }
})

router.post('/', async (req, res, next) => {
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    try{
        const cartProductsUser = await cartProductosController.getCart(req.session.passport.user)
        console.log(cartProductsUser)
        const user = req.user
        if(cartProductsUser.length !== 0) {
            const cartProductsAA = cartProductsUser.find(element => element.cart)
            const cartProducts = cartProductsAA.cart
            console.log(cartProducts)
            console.log('inicio notificaciones')
            // sendNewBuyEmail(user,cartProducts)
            // console.log('notificaciones EMAIL ADMIN ok')
            // sendNewbuyWhatsApp(user,cartProducts)
            // console.log('notificaciones WHATSAPP ADMIN ok')
            // sendNewbuySMS(user,cartProducts) 
            // console.log('notificaciones SMS USER whats ok')
        }
        console.log('Finalizado')
    }catch (error) {
        console.log(error)
    }
})


module.exports = router;