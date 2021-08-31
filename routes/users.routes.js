const router = require("express").Router();

// User routes
router.get("/");
router.get("/signup");
router.get("/login");
router.get("/favorites");
router.get("/profile");
router.get("/users");
router.get("/dashboard");
router.get("/recuperarpassword");
router.get("/restablecerpassword");

module.exports = router;
