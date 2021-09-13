const router = require("express").Router();
const pages = require("../controllers/views") //·Importamos el controlador de home
const user = require("../controllers/auth.controller"); //Importamos el controller que tiene la logica para hacer el logIn y el register

//Imports passport y session
const passport = require('passport')
const isLogguedIn = require('../middleware/isLoggued_google'); //Middleware para que los usuarios no registrados no puedan acceder a ciertas rutas
require('../middleware/auth_google');
const isAdmin = require('../middleware/isAdmin')

// Ruta para el scraping
router.get("/scraping", pages.scraperAll);


// const checkRolesExisted = require('../middlewares/verifySignUp');
// const checkEmailAndPassword = require('../middlewares/verifySignIn');
// const {
//     verifyToken,
//     isAdminJwt
// } = require('../middlewares/authJwt');


// User routes
router.get("/", pages.home);
router.get("/register", pages.register);
router.get("/register/email", pages.register2);
router.get("/favorites", pages.favorites);
router.get("/login", pages.login);
router.get("/profile", isLogguedIn);
router.get("/users", isAdmin , pages.users);
router.get("/dashboard", isAdmin, pages.dashboard)
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
router.post('/users', pages.delete)


module.exports = router;
