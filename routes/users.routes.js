const router = require("express").Router();
const pages = require("../controllers/views") //·Importamos el controlador de home
const user = require("../controllers/auth.controller"); //Importamos el controller que tiene la logica para hacer el logIn y el register

//Imports passport y session
const passport = require('passport')
const isLogguedIn = require('../middleware/isLoggued_google'); //Middleware para que los usuarios no registrados no puedan acceder a ciertas rutas
require('../middleware/auth_google');



// User routes
router.get("/", pages.home);
router.get("/register", pages.register);
router.get("/register/email", pages.register2);
router.get("/favorites", pages.favorites);
router.get("/login", pages.login);
router.get("/profile");
router.get("/users");
router.get("/dashboard", isLogguedIn, pages.dashboard)
router.get("/recuperarpassword");
router.get("/restablecerpassword");

//Rutas para google
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile']}))
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/failure'
}))
router.get('/auth/failure', user.fail)
router.get('/logout', user.logout)

router.post('/dashboard', pages.upWork) //Formulario para postular trabajos siendo admin
router.post('/register/email', user.register)
router.post('/login', user.login)



module.exports = router;
