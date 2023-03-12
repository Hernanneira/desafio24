const { Router } = require("express");
const router = Router();
const {controllerCreateCart} = require('../controllers/controllerCartProducts')

router.post("/", controllerCreateCart);

module.exports = router;
