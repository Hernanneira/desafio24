require('dotenv').config()
const {Router} = require('express');
const router = Router();
const sessionDBConnection = require('../db/sessionMongoAtlasDBConnection')
const usersController = require('../controllers/ContenedorLoginMongo')
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(sessionDBConnection)

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

passport.use('local', new LocalStrategy(async (username, password, done) => {
    console.log('PASSPORT.LOGIN BUSCANDO A USER EN MONGO')
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
    console.log('serializar USER*********')
    done(null, user.username)
})
passport.deserializeUser(async function (username,done){
    const user = await usersController.getAll()
    console.log('DESERIALIZ*****',user)
    const userSelected = user.find(u=>u.username === username)
    done(null, userSelected)
})

router.use(passport.initialize(), (req,res,next) => {
    console.log('iniciando passport en login')
    next()
})
router.use(passport.session(),(req,res,next) => {
    console.log('iniciando passport session en login')
    next()
})


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
    console.log('ROUTE GET /login')
    // const nombre = req.session?.username
    // if (nombre) {
    //     res.redirect('/api/productos-test')
    //     console.log('ROUTE GET /login ACEPTADO')
    // } else {
        res.render('login.ejs')
    //}
})

router.post('/', passport.authenticate('local', {failureRedirect: '/login-error', successRedirect: '/api/productos'}))


router.get('/login-error', (req,res) => {
    // logger.info(`Se intentó acceder a ${req.url} con método ${req.method} exitosamente`);
    res.render('pages/login-error')
})
module.exports = router;