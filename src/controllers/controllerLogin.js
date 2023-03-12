const logger = require("../utils/log4js");
const UsersDAO = require("../DAO/usersDAO");
const bcrypt = require("bcrypt");
// const cookieParser = require('cookie-parser');
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

passport.use(
  "local",
  new LocalStrategy(async (username, password, done) => {
    const usuarios = await UsersDAO.getAll();

    const user = usuarios.find((u) => u.username === username);

    if (!user) {
      console.log("Invalid user");
      return done(null, false);
    }

    if (!isValidPassword(user, password)) {
      console.log("Invalid Password");
      return done(null, false);
    }
    return done(null, user);
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.username);
});
passport.deserializeUser(async function (username, done) {
  const user = await UsersDAO.getAll();
  const userSelected = await user.find((u) => u.username === username);
  done(null, userSelected);
});


const getLogin = (req, res) => {
  logger.info(
    `Se intentó acceder a /LOGIN ${req.baseUrl} con método ${req.method} exitosamente`
  );
  try {
    const nombre = req.session?.passport?.user || false;
    if (nombre) {
      res.redirect("/api/productos");
    } else {
      res.render("login.ejs");
    }
  } catch (error) {
    console.log(error);
  }
};

const loginError = (req, res) => {
  logger.info(
    `Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`
  );
  res.render("/login-error.ejs");
};

const passportLocalLogin = passport.authenticate("local", {
    failureRedirect: "/login-error",
    successRedirect: "/api/productos",
  })

module.exports = { getLogin, loginError, passportLocalLogin };
