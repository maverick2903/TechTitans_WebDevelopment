const express = require("express");
const router = new express.Router();

const {
  newClient,
  updateClient,
  deleteClient,
  request,
  ongoingRequest,
  clientQuotePrice,
  clientGetPrice
} = require("../controllers/client.controller");
const authenticate = require("../middleware/auth");

router.post("/newClient", newClient);
router.patch("/updateClient", authenticate, updateClient);
router.delete("/deleteClient", authenticate, deleteClient);
router.post("/request", authenticate, request);
router.post("/ongoingRequest",authenticate,ongoingRequest)
router.post('/clientQuotePrice',authenticate,clientQuotePrice)
router.post('/clientGetPrice',authenticate,clientGetPrice)
module.exports = router;
