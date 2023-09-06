const express = require("express");
const router = express.Router();

const {getAllProfessionals, getDetails} = require("../controllers/professionalController");

router.route("/all").get(getAllProfessionals);
router.route("/details").post(getDetails);

module.exports = router;