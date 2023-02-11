const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            unique:[true,'username already exists']
            },
        password: {
            type: String,
            minlength: [8, "Password must contain minimum 8 characters"],
        },
        role:{
            type:String,
            enum:['worker','client','admin']
        }
    },{timestamps:true}
    )

userSchema.post("save", function (doc, next) {
    console.log("new User created", doc);
    next();
});
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 9);
    }
})
const User=mongoose.model('User',userSchema)
module.exports=User