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
    console.log("asdada")
    try
    {
    const worker=await workerVerification.find({})
    res.send(worker)
    }catch(err){
        console.log(err)
        res.status(400).json({message:err.message})
    }
}

const verifyWorker=async(req,res)=>{
    try {
        const username=req.body
        await Worker.findOneAndUpdate({username:username},{verified:true})
        await workerVerification.findOneAndDelete({username:username})
        res.status(200).json({message:'Worker Verified'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const deleteWorker=async(req,res)=>{
    try {
        const username=req.body
        await Worker.findOneAndDelete({username:username})
        await workerVerification.findOneAndDelete({username:username})
        res.status(200).json({message:'Worker deleted'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


module.exports={
    workerToBeVerified,
    verifyWorker,
    deleteWorker
}

