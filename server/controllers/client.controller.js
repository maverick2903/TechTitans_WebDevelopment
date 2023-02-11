const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const Client=require('../models/client.schema')
const Worker=require('../models/worker.schema')
const nodemailer = require("nodemailer");
app.use(express.json());
const generateOtp = require("../utilities/utils")
const SecretKey = process.env.SECRET_KEY;

const newClient=async(req,res)=>{
    try
    {
    const { name, mobile,username,password,location} = req.body;
    if (!name || !mobile )
        return res
            .status(400)
            .json({ message: "Please fill the necessary details " });
    const client = new Client(req.body);
    await client.save()
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

const updateClient=async(req,res)=>{
    try {
        const worker=await Client.findByIdAndUpdate(req.user._id,req.body)
        res.status(200).json({message:'Updated'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const deleteClient=async(req,res)=>{
    try {
        const client=await Client.findByIdAndDelete(req.user._id,req.body)
        res.status(200).json({message:'Client Deleted'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const request=async(req,res)=>{
    try {
        const {category,reqToClient}=req.body
        await Client.findByIdAndUpdate(req.user._id,req.body)
        const worker=await Worker.find({field:category})
        if(!worker)
        return res.status(400).json({message:'No worker available currently'})
        res.status(200).json(worker.field)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const acceptOffer=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports={
    newClient,
    updateClient,
    deleteClient,
    request
}