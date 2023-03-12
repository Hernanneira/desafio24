const { Router } = require("express");
const router = Router();
const sessionDBConnection = require("../db/sessionMongoAtlasDBConnection");
const passport = require("passport");
const {getLogin, passportLocalLogin} = require('../controllers/controllerLogin')

router.use(sessionDBConnection);

router.use(passport.initialize());
router.use(passport.session());

router.get("/", getLogin);

router.post( "/", passportLocalLogin);



module.exports = router;
