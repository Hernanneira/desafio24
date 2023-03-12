const {Router} = require('express');
const router = Router();
const {controllerSendCart, controllerGetCart} = require('../controllers/controllerCartProducts')

router.get('/', controllerGetCart)

router.post('/', controllerSendCart)


module.exports = router;