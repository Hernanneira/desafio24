const {Router} = require('express');
const routeProducts = Router();
const getIndexProducts = require('../controllers/controllerProducts')

routeProducts.get('/', getIndexProducts )

module.exports = {
    routeProducts,
}