// const webAuth = (req, res, next) => {
//     if (req.session?.nombre) {
//         next()
//     } else {
//         res.redirect('/login')
//     }
//}


const isAuth = (req, res, next) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        console.log('req.isAuthenticated():',req.isAuthenticated())
        next()
    } else {
        res.redirect('/login')
    }
}
module.exports = isAuth

// const apiAuth = (req, res, next) =>  {
//     if (req.session?.nombre) {
//         next()
//     } else {
//         res.status(401).json({ error: 'no autorizado!' })
//     }
// }

// module.exports = webAuth
// module.exports = apiAuth