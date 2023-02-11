const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const workerVerificationSchema = new mongoose.Schema(
    {
        username: { type: String },
        idProof: { type: String },
        name:{type:String}
    })

const workerVerification = mongoose.model('workerVerification', workerVerificationSchema)
module.exports = workerVerification
