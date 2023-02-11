const express = require("express");
const router = new express.Router();

const {
  workerToBeVerified,
  verifyWorker,
  deleteWorker,
} = require("../controllers/admin.controller");

const authenticate = require("../middleware/auth");

router.get("/workerToBeVerified", workerToBeVerified);
router.post("/verifyWorker", verifyWorker);
router.delete("/deleteWorkerAdmin", deleteWorker);

module.exports = router;
