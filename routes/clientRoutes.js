const express = require("express");
const router = express.Router();

const { getAssociatedClients, getClientDetails, getClientAssessmentResults } = require("../controllers/clientController");

router.route("/associatedClients").get(getAssociatedClients);
router.route("/:id").get(getClientDetails);
router.route("/assessmentResults/:id").get(getClientAssessmentResults);


module.exports = router;