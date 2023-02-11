const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const workerVerificationSchema=new mongoose.Schema(
    {
        workers:[{
            worker:{
                idProof:{type:String},
                worker_id:{type:mongoose.Schema.Types.ObjectId}
            }
    }]
})

const workerVerification=mongoose.model('workerVerification',workerVerificationSchema)
module.exports=workerVerification