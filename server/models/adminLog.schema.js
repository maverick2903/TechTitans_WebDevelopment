const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const adminLogSchema=new mongoose.Schema(
    {
        pairings:[
            {
                client_id:{type:mongoose.Schema.Types.ObjectId},
                worker_id:{type:mongoose.Schema.Types.ObjectId}
            }
        ]
    })
const AdminLog=mongoose.model('AdminLog',adminLogSchema)
module.exports=adminLogSchema