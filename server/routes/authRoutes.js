const express = require("express");

const router = express.Router();

const {
  register,
  login,
  guestLogin,
  logout,
  getMe,
  updateProfile,
} = require("../controllers/authController");

const {
  registerValidation,
  loginValidation,
  validate,
} = require("../validations/authValidation");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

router.post(
  "/login",
  loginValidation,
  validate,
  login
);
router.post("/guest", guestLogin);
router.post("/logout", logout);

router.get("/me", protect, getMe);

router.put("/profile", protect, updateProfile);

module.exports = router;