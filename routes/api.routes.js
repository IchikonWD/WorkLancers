const router = require("express").Router();
const pages = require("../controllers/admin")

// const checkRolesExisted = require('../middlewares/verifySignUp');
// const checkEmailAndPassword = require('../middlewares/verifySignIn');
// const {
//     verifyToken,
//     isAdmin
// } = require('../middlewares/authJwt');

// Search
router.post("/api/user");
router.put("/api/user");
router.delete("/api/user");

// Login
router.post("/api/login");
router.post("/api/logout");
router.get("/api/search");

// Admin
router.get("/ads", pages.myJobs)
router.post("/api/ads");
router.put("/api/ads");
router.delete("/api/ads");

// Favorites
router.post("/api/favorites");
router.delete("/api/favorites");

module.exports = router;

