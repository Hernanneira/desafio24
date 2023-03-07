const {Router} = require('express');
const router = Router();
const sessionDBConnection = require('../db/sessionMongoAtlasDBConnection')

router.use(sessionDBConnection)

router.get('/',(req,res)=>{
    const nombre = req.session.passport?.user
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
})

module.exports = router;