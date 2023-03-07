const {Router} = require('express');
const router = Router();
// const {cartProducts} = require('./productRoute')
//estoy usando el de productos catalago hasta solucianr el CART NICO
const cartProductosController = require('../controllers/ContenedorCartProducts')
// const usersController = require('../controllers/ContenedorLoginMongo')
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

//router.post('/', async (req, res, next) => {
    // por el momento uso todo el catalogo hasta resolver el cart NICO
    // logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    // const cartProducts = await usersController.getAll()
    // const allUser = await usersController.getAll()
    // const user = allUser.find(element => element.username = req.session.passport?.user)
    // if(cartProducts !== []) {
    //     console.log('inicio notificaciones')
        // sendNewBuyEmail(user,cartProducts)
        // console.log('notificaciones EMAIL ADMIN ok')
        // sendNewbuyWhatsApp(user,cartProducts)
        // console.log('notificaciones WHATSAPP ADMIN ok')
        // sendNewbuySMS(user,cartProducts) 
        // console.log('notificaciones SMS USER whats ok')
    //}
    // console.log('hola')
    // console.log(req.body)
    // cartProducts = req.body
//})

// router.post('/', async (req, res, next) => {
//     logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
//     const cartProductos = req.body
//     console.log('req.body',cartProductos)
//     await usersController.update(req.session.passport.user ,cartProductos)
//     const cartProductsUser = await usersController.getCart({nombre: req.session.passport.user})
//     const cartProductsAA = cartProductsUser.find(element => element.cart)
//     const cartProducts = cartProductsAA.cart
//     console.log('Producto Updateado',cartProducts)
//     res.render('cart.ejs',{cartProducts, nombre: req.session.passport.user })
// })

router.delete('/', async (req, res, next) => {
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    await cartProductosController.deleteAll(req.session.passport.user)
    res.render('cart.ejs',{user: req.session.passport.user})
})

module.exports = router;