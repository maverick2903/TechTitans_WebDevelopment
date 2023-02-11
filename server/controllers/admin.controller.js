const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const Client=require('../models/client.schema')
const Worker=require('../models/worker.schema')
const workerVerification=require('../models/workerVerification.Schema')
const nodemailer = require("nodemailer");
app.use(express.json());
const generateOtp = require("../utilities/utils")
const SecretKey = process.env.SECRET_KEY;

const workerToBeVerified=async(req,res)=>{
    try
    {
    const worker=await workerVerification.find({})
    res.status(200).json(worker)
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

const verifyWorker=async(req,res)=>{
    try {
        await Worker.findByIdAndUpdate(req.params.id,{verified:true})
        await workerVerification.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Worker Verified'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}