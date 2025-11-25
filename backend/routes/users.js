const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, userController.getMe);

module.exports = router;
