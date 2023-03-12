const {Router} = require('express');
const isAuth = require('../utils/auth');
const logger = require('../utils/log4js')
const router = Router();
const {routeProducts} = require('./productRoute')
const routeLogin = require('./loginRoute')
const routeRegister = require('./registerRoute')
const routeLogout = require('./logoutRoute')
const routeInfo = require('./infoRoute')
const routeRandom = require('./randomRoute')
const routeCart =require('./cartRoute')
const passport = require('passport');
const routerAPI = require('./apiRouter')
const sessionDBConnection = require('../db/sessionMongoAtlasDBConnection');
const {loginError} = require('../controllers/controllerLogin')

router.use(sessionDBConnection)

router.use(passport.initialize())

router.use(passport.session())

router.use('/api/productos',isAuth, routeProducts)
router.use('/login', routeLogin)
router.use('/register', routeRegister)
router.use('/logout', routeLogout)
router.use('/info',routeInfo)
router.use('/api/randoms',routeRandom)
router.use('/api/cart',isAuth, routeCart)
router.use('/api/v1/cart', routerAPI )
router.get("/login-error", loginError);

router.get('/', (req, res) => {
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente, REDIRIGIENDO A LOGIN`);
    res.redirect('/login')
})

// router.get('*', (req, res) => {
//     logger.warn(`Route: ${req.path} 404 Not Found Method: ${req.method} `);
//     res.send("Sorry 🤷‍♂️ 404 Not Found");
// });


module.exports = router;