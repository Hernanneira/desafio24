const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
}
// const sessionDBConnection = session({
//     store: MongoStore.create({
//         mongoUrl: `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@clustercoder.rrnnvzr.mongodb.net/?retryWrites=true&w=majority`,
//         mongoOptions: advancedOptions
//     }),
//     secret: 'algo',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 600000
//     }
// })
const sessionDBConnection = session({
    secret: 'algo',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
})

module.exports = sessionDBConnection