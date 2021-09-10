const router = require("express").Router();
const pages = require("../controllers/views") //·Importamos el controlador de home
const user = require("../controllers/auth.controller"); //Importamos el controller que tiene la logica para hacer el logIn y el register

// User routes
router.get("/", pages.home);
router.get("/register", pages.register);
router.get("/register/email", pages.register2);
router.get("/favorites", pages.favorites);
router.get("/login", pages.login);
router.get("/profile");
router.get("/users");
router.get("/dashboard", pages.dashboard)
router.get("/recuperarpassword");
router.get("/restablecerpassword");

router.post('/dashboard', pages.upWork) //Formulario para postular trabajos siendo admin
router.post('/register/email', user.register)
router.post('/login', user.login)



module.exports = router;
