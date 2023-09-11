const express = require("express");
const router = express.Router();

const { getAssociatedClients, getClientDetails } = require("../controllers/clientController");

router.route("/associatedClients").get(getAssociatedClients);
router.route("/:id").get(getClientDetails);


module.exports = router;