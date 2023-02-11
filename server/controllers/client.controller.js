const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const Client = require('../models/client.schema')
const Worker = require('../models/worker.schema')
const nodemailer = require("nodemailer");
app.use(express.json());
const generateOtp = require("../utilities/utils")
const SecretKey = process.env.SECRET_KEY;

const newClient = async (req, res) => {
    try {
        console.log(req.body)
        console.log("234234234")
        const { name, mobile, username, password, location } = req.body;
        const a = Number(mobile)
        if (!name || !mobile) {
            console.log("11")
            return res
                .status(400)
                .json({ message: "Please fill the necessary details " });
        }
        console.log("1")
        const client = new Client({ mobile:a, name, username, password, location });
        console.log("2")
        await client.save()
        console.log("3")
        res.status(200).json({ message: "succesful" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
}

const updateClient = async (req, res) => {
    try {
        const worker = await Client.findByIdAndUpdate(req.user._id, req.body)
        res.status(200).json({ message: 'Updated' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.user._id, req.body)
        res.status(200).json({ message: 'Client Deleted' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const request = async (req, res) => {
    try {
        const { category, reqToClient } = req.body
        await Client.findByIdAndUpdate(req.user._id, req.body)
        res.status(200).json({message:"success"})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const ongoingRequest=async(req,res)=>{
    try {
       res.status(200).json({message:req.user.reqToClient})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const clientQuotePrice=async(req,res)=>{
    try {
        const {username,price}=req.body //worker ka username chaiye
        await Communication.findOneAndUpdate({usernameClient:username},{priceByClient:price})
        await Communication.findOneAndUpdate({usernameClient:username},{usernameWorker:req.user.username})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const clientGetPrice=async(req,res)=>{
    try {
        const {username}=req.body //worker ka username chaiye
        const user=await Communication.findById(username._id)
        res.status(200).json({message:user.priceByClient})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports={
    newClient,
    updateClient,
    deleteClient,
    request,
    ongoingRequest,
    clientQuotePrice,
    clientGetPrice
}