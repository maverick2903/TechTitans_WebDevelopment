const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const User = require('../models/user.schema')
const nodemailer = require("nodemailer");
app.use(express.json());
const generateOtp = require("../utilities/utils")
const SecretKey = process.env.SECRET_KEY

const newUser = async (req, res) => {
    try {
        console.log(req.body)
        const { username, password, role } = req.body;
        if (!username || !password || !role)
            return res
                .status(400)
                .json({ message: "Please fill the necessary details " });
        const user = new User(req.body);
        await user.save()
        const token = jwt.sign({ username: req.body.username }, SecretKey);
            res.cookie("jsonwebtoken", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
        res.status(200).json({ message: 'Successfully Registered' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password)
            return res
                .status(400)
                .json({ message: "Please fill the necessary details " });
        const userData = await User.findOne({ email: req.body.username });
        if (!userData)
            return res.status(400).json({ message: "User not found" });
        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        );
        if (!userData || !validPassword)
            res.status(400).json({ message: "Invalid credentials" });
        else {
            const token = jwt.sign({ username: req.body.username }, SecretKey);
            res.cookie("jsonwebtoken", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            return res
                .status(200)
                .json(userData);
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const logout = async (req, res) => {
    res.clearCookie("jsonwebtoken", { path: "/" });
    res.status(200).json({ message: "User logged out successfully" });
};



module.exports = {
    newUser,
    loginUser,
    logout
}