const {Router} = require('express');
const router = Router();
// const {cartProducts} = require('./productRoute')
//estoy usando el de productos catalago hasta solucianr el CART NICO
const cartProductosController = require('../controllers/ContenedorProductos')
const usersController = require('../controllers/ContenedorLoginMongo')
const sendNewBuyEmail = require('../utils/newBuyEmail')
const sendNewbuySMS = require('../utils/newBuySMS')
const sendNewbuyWhatsApp = require('../utils/newBuyWhatsApp')
const logger = require('../utils/log4js')

router.get('/',  async (req, res, next) =>{
        try{
            logger.info(`Se intentó acceder a /cart ${req.url} con método ${req.method} exitosamente`);
            const cartProducts = await cartProductosController.getAll()
            console.log('cart',cartProducts)
        if (!cartProducts) {
            logger.error('no se pudo traer productos del carrito')
            res.render('cart.ejs',{cartProducts, nombre: req.session.passport.user })
        }
        res.render('cart.ejs',{cartProducts, nombre: req.session.passport.user })
        }catch (err) {
            console.log(err)
        }
        
    })

router.post('/', async (req, res, next) => {
    // por el momento uso todo el catalogo hasta resolver el cart NICO
    const cartProducts = await cartProductosController.getAll()
    const allUser = await usersController.getAll()
    const user = allUser.find(element => element.username = req.session.passport?.user)
    if(cartProducts !== []) {
        console.log('inicio notificaciones')
        // sendNewBuyEmail(user,cartProducts)
        // console.log('notificaciones EMAIL ADMIN ok')
        sendNewbuyWhatsApp(user,cartProducts)
        console.log('notificaciones WHATSAPP ADMIN ok')
        // sendNewbuySMS(user,cartProducts) 
        // console.log('notificaciones SMS USER whats ok')
    }
    // console.log('hola')
    // console.log(req.body)
    // cartProducts = req.body
})

module.exports = router;