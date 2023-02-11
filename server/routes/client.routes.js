const express = require("express");
const router = new express.Router();

const {
  newClient,
  updateClient,
  deleteClient,
  request,
} = require("../controllers/client.controller");
const authenticate = require("../middleware/auth");

router.post("/newClient", newClient);
router.patch("/updateClient", authenticate, updateClient);
router.delete("/deleteClient", authenticate, deleteClient);
router.post("/request", authenticate, request);

module.exports = router;
