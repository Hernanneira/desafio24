const {Router} = require('express');
const passport = require('passport');
const router = Router();
// const sessionDBConnection = require('../db/sessionMongoAtlasDBConnection')


// router.use(sessionDBConnection)

router.get('/',(req,res)=>{
    const nombre = req.session?.passport.nombre
    console.log('nombre en log out:', nombre)
    console.log('en logout')
    if (nombre) {
        req.session.destroy(err => {
            if (!err) { 
                res.render('logout.ejs', { nombre })
            } else {
                res.redirect('/api/productos')
            }
        })
    } else {
        res.redirect('/api/productos')
    }
    // req.session.destroy()
    // req.logout()
    // res.redirect('/')
})

module.exports = router;