const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const Client=require('../models/client.schema')
const nodemailer = require("nodemailer");
app.use(express.json());
const generateOtp = require("../utilities/utils")
const SecretKey = process.env.SECRET_KEY;
const newUser = async (req, res) => {
    const { username, password, email, pincode, mobile } = req.body;
    if (!username || !password || !email || !pincode || !mobile)
        return res
            .status(400)
            .json({ message: "Please fill the necessary details " });
    const user = new User(req.body);
    try {
        await user.save();
        var transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASS
            }
        })
        var mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Succesfully Registered",
            text: "Your account has been created successfully, we hope you enjoy your stay!",
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
        });
        res.status(200).json({ message: "Success", userId: user._id });
    } catch (error) {
        res.status(500).json({
            message:
                error.message || "There was some error while authentication",
        });
    }
};