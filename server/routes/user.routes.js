const express = require("express");
const router = new express.Router();

const{
    newUser,
    loginUser,
    logout
}=require('../controllers/user.controller')

const authenticate=require('../middleware/auth')

router.post('/newUser',newUser)
router.post('/loginUser',loginUser)
router.get('/logout',logout)

module.exports=router