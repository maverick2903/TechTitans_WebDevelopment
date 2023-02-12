const express = require("express");
const router = new express.Router();

const {
  workerToBeVerified,
  verifyWorker,
  deleteWorker,
} = require("../controllers/admin.controller");

const authenticate = require("../middleware/auth");

router.post("/workerToBeVerified", workerToBeVerified);
router.post("/verifyWorker", verifyWorker);
router.delete("/deleteWorkerAdmin", deleteWorker);

module.exports = router;
