const router = require("express").Router();
const pages = require ("../controllers/views") //Importamos el controlador de home


// User routes
router.get("/", pages.home);
router.get("/signup");
router.get("/login",pages.login);
router.get("/favorites");
router.get("/profile");
router.get("/users");
router.get("/dashboard");
router.get("/recuperarpassword");
router.get("/restablecerpassword");

module.exports = router;
