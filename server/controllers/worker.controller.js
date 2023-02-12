const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const Worker=require('../models/worker.schema')
const Client=require('../models/client.schema')
const workerVerification=require('../models/workerVerification.Schema')
const Communication=require('../models/communication.schema')
const nodemailer = require("nodemailer");
app.use(express.json());
const generateOtp = require("../utilities/utils")

const newWorker=async (req, res) => {
    try
    {
    console.log(req.body)
    const { name, mobile,city,username,password,field,idProof} = req.body;
    if (!name || !mobile || !city || !field)
        return res
            .status(400)
            .json({ message: "Please fill the necessary details " });
    const worker = new Worker(req.body);
    const workerVerify=new workerVerification({username:username,name:name,idProof:idProof})
    await worker.save()
    res.status(200).json({message:"successfull"})
    }catch(err){
        console.log(err)
        res.status(400).json({message:err.message})
    }
}

const updateWorker=async(req,res)=>{
    try {
        //user data reqd from frontend
        //const {user}=req.body
        const worker=await Worker.findOneAndUpdate({username:req.user.username},req.body)
        res.status(200).json({message:'Updated'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const deleteWorker=async(req,res)=>{
    try {
        const worker=await Worker.findByIdAndDelete(req.user._id,req.body)
        res.status(200).json({message:'Worker Deleted'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const selfView=async(req,res)=>{
    try {
        const worker=await Worker.findById(req.user._id)
        res.status(200).json(worker)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const clientJob=async(req,res)=>{
    try {
        const client=await Client.find({})
        res.status(200).json({category:client.category,reqToClient:client.reqToClient,username:client.username})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const particularClientJob=async(req,res)=>{
    try {
        const client=await Client.find({category:req.user.field})   
        res.status(200).json(client.reqToClient)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const requestClient=async(req,res)=>{
    try {
        const username=req.body //client username chaiye
        //const user=await Client.find({username:username})
        const communication=new Communication({
            usernameWorker:username,
            usernameClient:req.user.username 
        })
        await communication.save()
        res.status(200).json({message:'Connected'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const workerQuotePrice=async(req,res)=>{
    try {
        const {username,price}=req.body //client ka username chaiye
        await Communication.findOneAndUpdate({usernameClient:username},{priceByWorker:price})
        await Communication.findOneAndUpdate({usernameClient:username},{usernameWorker:req.user.username})
        res.status(200).json({message:price})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const workerGetPrice=async(req,res)=>{
    try {
        const {username}=req.body //client ka username chaiye
        const user=await Communication.findById(username._id)
        res.status(200).json({message:user.priceByWorker})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports={
    newWorker,
    updateWorker,
    deleteWorker,
    selfView,
    clientJob,
    particularClientJob,
    requestClient,
    workerQuotePrice,
    workerGetPrice
}