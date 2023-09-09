const express = require("express");
const router = express.Router();

const {getAllProfessionals, getDetails, notify} = require("../controllers/professionalController");

router.route("/all").get(getAllProfessionals);
router.route("/:id").get(getDetails);
router.route("/:id/notify").get(notify);

module.exports = router;