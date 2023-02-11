const express = require("express");
const router = new express.Router();

const {
    newWorker,
    updateWorker,
    deleteWorker,
    selfView,
    clientJob,
    particularClientJob,
    requestClient,
} = require("../controllers/worker.controller");
const authenticate = require("../middleware/auth");

router.post("/newWorker", newWorker);
router.patch("/updateWorker", authenticate, updateWorker);
router.delete("/deleteWorker", authenticate, deleteWorker);
router.get("/selfView", authenticate, selfView);
router.post("/clientJob", authenticate, clientJob);
router.get("/particularClientJob", authenticate, particularClientJob);

module.exports = router;
