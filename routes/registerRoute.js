const {Router} = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const usersController = require('../controllers/ContenedorLoginMongo')
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const sendNewRegisterEmail = require('./../utils/newRegisterEmail')


function createHash(password) {
    return bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(saltRounds),
            null);
}  

passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password ,done) => {
    const usuarios = await usersController.getAll()

    const userLogin = usuarios.find(u => u.username === username)

    if (userLogin) {
        return done('Usuario ya registrado')
    }

    const user = {  
        username: username,
        password: createHash(password),
        email: req.body.email,
        direccion: req.body.direccion,
        edad: req.body.edad,
        telefono: req.body.telefono,
        foto: req.body.foto
    }

    const newUser = await usersController.save(user)

    try {
        await sendNewRegisterEmail(user)
    } catch (error) {
        console.log('error:',error)
    }
    
    return done(null, user)
    }));

passport.serializeUser(function (user, done){
    done(null, user.username)
})
passport.deserializeUser(async function (username,done){
    const user = await usersController.getAll()
    const userSelected = user.find(u=>u.username === username)
    done(null, userSelected)
})


router.get('/', async(req,res)=>{
    res.render('register.ejs')
})
router.post('/', passport.authenticate('register',{failureRedirect: '/register-error', successRedirect:'/api/productos'}));

router.get('/register-error',(req, res)=>{
    res.json('error')
})
module.exports = router;