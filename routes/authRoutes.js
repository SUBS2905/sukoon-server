const express = require("express");
const router = express.Router();
const {signUp, signIn, verifyLogin, getUser, userProfile} = require("../controllers/authController");

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/profile').get(getUser);
router.route('/profile').post(userProfile);
// router.route('/signin/verify').post(verifyLogin);

module.exports = router;