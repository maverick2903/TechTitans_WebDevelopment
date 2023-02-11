const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const communicationSchema=new mongoose.Schema({
    usernameWorker:{
        type:String
    },
    usernameClient:{
        type:String
    },
    priceByWorker:{
        type:Number
    },
    priceByClient:{
        type:Number
    },
    finished:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:['Accept','Reject','Request Stage','Negotiation Stage']
    }
})

const Communication=mongoose.model('Communication',communicationSchema)
module.exports=Communication