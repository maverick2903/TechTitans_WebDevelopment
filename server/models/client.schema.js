const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const clientSchema=new mongoose.Schema(
    {
        username: {
            type: String,
        },
        password: {
            type: String,
            minlength: [8, "Password must contain minimum 8 characters"],
        },
        email: {
            type: String,
            unique: [true, "This email address already exists!"],
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email-Id");
                }
            },
        },
        mobile: {
            type: Number,
            unique: [true, "mobile no. exists"],
            length: [10, "Mobile Number must be 10 digits "],
        },
        otp: {
            type: Number,
            index: true,
        },
        city:{
            type:String
        },
        role:{
            type:String,
            enum:['client']
        },
        hasSentReq:{
            type:Boolean
        },
        category:{
            type:String
        },
        reqToClient:{
            type:String
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
            },
            coordinates: {
                type: [Number],
                index: "2dsphere",
            },
            formattedAddress: String,
        },
        
    },{timestamps:true}
)

clientSchema.post("save", function (doc, next) {
    console.log("new User created", doc);
    next();
});

clientSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 9);
    }
    next();
});

const Client=mongoose.model('Client',clientSchema)
module.exports=Client