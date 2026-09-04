const express = require("express");
const router = express.Router();
const ticketController = require("../controller/ticketController");

router.post("/", ticketController.handleCreateTicket);

module.exports = router;
