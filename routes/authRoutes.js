const express = require("express");
const router = express.Router();
const {signUp, signIn, verifyLogin, getUser} = require("../controllers/authController");

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/getuser').post(getUser);
// router.route('/signin/verify').post(verifyLogin);

module.exports = router;