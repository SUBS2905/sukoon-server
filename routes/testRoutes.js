const express = require("express");
const router = express.Router();
const {addTest} = require("../controllers/testController");

router.route('/').post(addTest);

module.exports = router;