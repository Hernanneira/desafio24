require('dotenv').config()
const {Router} = require('express');
const router = Router();
const sessionDBConnection = require('../db/sessionMongoAtlasDBConnection')
const usersController = require('../controllers/ContenedorLoginMongo')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

passport.use('local', new LocalStrategy(async (username, password, done) => {
    console.log('iniciando passport.use local en login')
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
    console.log('DESERILIZER****:',username)
    const user = await usersController.getAll()
    console.log('USER****:',user)
    const userSelected = user.find(u=>u.username === username)
    console.log('userSelected****:',userSelected)
    done(null, userSelected)
})
// router.use(cookieParser)
router.use(sessionDBConnection)

router.use(passport.initialize(), (req,res,next) => {
    console.log('iniciando passport en login')
    next()
})
router.use(passport.session(),(req,res,next) => {
    console.log('iniciando passport session en login')
    next()
})
// router.use(passport.initialize())
// router.use(passport.session())

// router.get('/', async (req, res) => {
//     console.log(req.isAuthenticated())
//     if (req.isAuthenticated()){
//         res.redirect('/api/productos')
//     }else{
//         res.render('login.ejs')
//     }
// });

router.get('/', (req, res) => {
    // logger.info(`Se intentó acceder a ${req.url} con método ${req.method} exitosamente`);
        res.render('login.ejs')
    //}
})

router.post('/', passport.authenticate('local', {failureRedirect: '/login-error', successRedirect: '/api/productos'}))


router.get('/login-error', (req,res) => {
    // logger.info(`Se intentó acceder a ${req.url} con método ${req.method} exitosamente`);
    res.render('pages/login-error')
})
module.exports = router;