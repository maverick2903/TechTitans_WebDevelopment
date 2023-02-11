const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const Worker=require('../models/worker.schema')
const nodemailer = require("nodemailer");
app.use(express.json());
const generateOtp = require("../utilities/utils")

const newWorker=async (req, res) => {
    const { username, password,name,} = req.body;
    if (!username || !password || !email || !pincode || !mobile)
        return res
            .status(400)
            .json({ message: "Please fill the necessary details " });
    const worker = new Worker(req.body);
}