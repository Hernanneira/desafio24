const logger = require('../utils/log4js')

const getIndexProducts = async (req, res, next) =>{
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    res.render('index.ejs',{ nombre: req.session.passport.user }) 
    }

module.exports = getIndexProducts
