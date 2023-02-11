const express = require("express");
const router = new express.Router();

const{
    newWorker,
    updateWorker,
    deleteWorker,
    selfView
}=require('../controllers/worker.controller')
const authenticate=require('../middleware/auth')

router.post('/newWorker',newWorker)
router.patch('/updateWorker',authenticate,updateWorker)
router.delete('/deleteWorker',authenticate,deleteWorker)
router.get('/selfView',authenticate,selfView)

module.exports=router