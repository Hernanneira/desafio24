const dotenv = require("dotenv");
dotenv.config();
const logger = require("../utils/log4js");
const cartProductosDAO = require("../DAO/cartProductosDAO.js");
const sendNewBuyEmail = require('../utils/newBuyEmail')
const sendNewbuySMS = require('../utils/newBuySMS')
const sendNewbuyWhatsApp = require('../utils/newBuyWhatsApp')

const controllerCreateCart = async (req, res, next) => {
  logger.info(
    `Se accedio a ${req.baseUrl} con método ${req.method} exitosamente`
  );
  const cartProductos = req.body;
  const cartUser = {
    cart: cartProductos,
    user: req.session.passport.user,
  };
  const cart = await cartProductosDAO.createCart(cartUser);

  cart
    ? res.status(200).json({ succes: `El carrito se creo con exito ${cart}` })
    : res.status(500).json({ error: "Hubo un error en el servidor" });
};

const controllerSendCart = async (req, res, next) => {
  logger.info(
    `Se accedio a ${req.baseUrl} con método ${req.method} exitosamente`
  );
  try {
    const cartProductsUser = await cartProductosDAO.getCart(
      req.session.passport.user
    );
    console.log(cartProductsUser);
    const user = req.user;
    if (cartProductsUser.length !== 0) {
      const cartProductsAA = cartProductsUser.find((element) => element.cart);
      const cartProducts = cartProductsAA.cart;
      console.log(cartProducts);
      console.log("inicio notificaciones");
      // sendNewBuyEmail(user,cartProducts)
      // console.log('notificaciones EMAIL ADMIN ok')
      // sendNewbuyWhatsApp(user,cartProducts)
      // console.log('notificaciones WHATSAPP ADMIN ok')
      // sendNewbuySMS(user,cartProducts)
      // console.log('notificaciones SMS USER whats ok')
    }
    console.log("Finalizado");
  } catch (error) {
    console.log(error);
  }
};

const controllerGetCart = async (req, res, next) =>{
  try{
      logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
  res.render('cart.ejs',{user: req.session.passport.user})
  }catch (err) {
      console.log(err)
  }
}

module.exports = { controllerCreateCart, controllerSendCart, controllerGetCart };
