const {Router} = require('express');
const isAuth = require('../utils/auth');
const logger = require('../utils/log4js')
const router = Router();
const routeProducts = require('./productRoute')
const routeLogin = require('./loginRoute')
const routeRegister = require('./registerRoute')
const routeLogout = require('./logoutRoute')
const routeInfo = require('./infoRoute')
const routeRandom = require('./randomRoute')
const passport = require('passport');
const sessionDBConnection = require('../db/sessionMongoAtlasDBConnection');
const usersController = require('../controllers/ContenedorLoginMongo')
// const cookieParser = require('cookie-parser');

// router.use(cookieParser)
router.use(sessionDBConnection)

router.use(passport.initialize())

router.use(passport.session())

router.use('/api/productos',isAuth, routeProducts) // midleware isAuth removido funciona.
router.use('/login', routeLogin)
router.use('/register', routeRegister)
router.use('/logout', routeLogout)
router.use('/info',routeInfo)
router.use('/api/randoms',routeRandom)


router.get('/', (req, res) => {
    logger.info(`Se intentó acceder a ${req.url} con método ${req.method} exitosamente, REDIRIGIENDO A LOGIN`);
    res.redirect('/login')
})

router.get('*', (req, res) => {
    logger.warn(`Route: ${req.path} 404 Not Found Method: ${req.method} `);
    res.send("Sorry 🤷‍♂️ 404 Not Found");
});


module.exports = router;