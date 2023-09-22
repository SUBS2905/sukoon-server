const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUser,
  updateUserProfile,
  updateProfessionalProfile,
  verifyUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/profile").get(getUser);
router.route("/profile").patch(updateUserProfile);
router.route("/professional").patch(updateProfessionalProfile);
router.route("/verify").post(verifyUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

module.exports = router;
