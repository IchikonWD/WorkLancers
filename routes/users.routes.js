const router = require("express").Router();
const pages = require ("../controllers/views") //·Importamos el controlador de home
const passport = require("../controllers/passport") //Importamos el controller que tiene la logica para hacer el logIn y el register

const checkRolesExisted = require('../middlewares/verifySignUp');
const checkEmailAndPassword = require('../middlewares/verifySignIn');
const {
    verifyToken,
    isAdmin
} = require('../middlewares/authJwt');


// User routes
router.get("/", pages.home);
router.get("/register", pages.register);
router.get("/favorites", pages.favorites);
router.get("/login",pages.login);
router.get("/profile");
router.get("/users");
router.get("/dashboard", pages.dashboard)
router.get("/recuperarpassword");
router.get("/restablecerpassword");

router.post('/dashboard', pages.upWork) //Formulario para postular trabajos siendo admin
router.post('/register', passport.register)
router.post('/login, ')



module.exports = router;
