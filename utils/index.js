// const webAuth = (req, res, next) => {
//     if (req.session?.nombre) {
//         next()
//     } else {
//         res.redirect('/login')
//     }
//}


const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
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