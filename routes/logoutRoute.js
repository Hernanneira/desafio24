const {Router} = require('express');
// const passport = require('passport');
const router = Router();
const sessionDBConnection = require('../db/sessionMongoAtlasDBConnection')


router.use(sessionDBConnection)

router.get('/',(req,res)=>{
    console.log('req.session:',req.session)
    const nombre = req.session.passport?.user
    if (nombre) {
        console.log('nombre=', nombre)
        req.session.destroy(err => {
            if (!err) { 
                res.render('logout.ejs', { nombre })
                console.log('logout exitoso')
            } else {
                res.redirect('/api/productos')
                console.log('redirigio a api/productos nombre =true')
            }
        })
    } else {
        res.redirect('/api/productos')
        console.log('redirigio a api/productos')
    }
    // req.session.destroy()
    // req.logout()
    // res.redirect('/')
})

module.exports = router;