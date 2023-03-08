const {Router} = require('express');
const router = Router();
const sessionDBConnection = require('../db/sessionMongoAtlasDBConnection')
const usersController = require('../controllers/ContenedorLoginMongo')
const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const logger = require('../utils/log4js')

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

passport.use('local', new LocalStrategy(async (username, password, done) => {
    const usuarios = await usersController.getAll()

    const user = usuarios.find(u => u.username === username)

    if (!user) {
        console.log('Invalid user');
        return done(null, false)
    }

    if (!isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false);
    }
    return done(null, user)
}));

passport.serializeUser( function (user, done){
    done(null, user.username)
})
passport.deserializeUser( async function (username, done){
    const user = await usersController.getAll()
    const userSelected = await user.find(u=>u.username === username)
    done(null, userSelected)
})
// router.use(cookieParser)
router.use(sessionDBConnection)

router.use(passport.initialize())
router.use(passport.session())


router.get('/', (req, res) => {
    logger.info(`Se intentó acceder a /LOGIN ${req.baseUrl} con método ${req.method} exitosamente`);
    try {
       const nombre =  req.session?.passport?.user || false
        if (nombre) {
            res.redirect('/api/productos')
        }else{
            res.render('login.ejs')
        }
    }catch (error) {
        console.log(error)
    }
})

router.post('/', passport.authenticate('local', {failureRedirect: '/login-error', successRedirect: '/api/productos'}))


router.get('/login-error', (req,res) => {
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    res.render('/login-error.ejs')
})
module.exports = router;