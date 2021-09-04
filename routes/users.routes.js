const router = require("express").Router();
const pages = require ("../controllers/views") //·Importamos el controlador de home


// User routes
router.get("/", pages.home);
router.get("/register", pages.register);
router.get("/favorites", pages.favorites);
router.get("/login",pages.login);
router.get("/profile");
router.get("/users");
router.get("/dashboard")
router.get("/dashboard/upWork", pages.upWork);
router.get("/recuperarpassword");
router.get("/restablecerpassword");

router.post('/dashboard', pages.upWork)



module.exports = router;
