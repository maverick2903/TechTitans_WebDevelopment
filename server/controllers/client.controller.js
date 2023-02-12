const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

const Client = require('../models/client.schema')
const Worker = require('../models/worker.schema')
const AdminLog=require('../models/adminLog.schema')
const nodemailer = require("nodemailer");
app.use(express.json());
const generateOtp = require("../utilities/utils");
const { Admin } = require("mongodb");

const SecretKey = process.env.SECRET_KEY;

const newClient = async (req, res) => {
    try {
        const { name, mobile, username, password, location } = req.body;
        const num = Number(mobile);
        if (!name || !mobile) {
            return res
                .status(400)
                .json({ message: "Please fill the necessary details " });
        }
        const client = new Client({
            mobile: num,
            name,
            username,
            password,
            location,
        });
        await client.save();
        res.status(200).json({ message: "successful" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

const updateClient = async (req, res) => {
    try {
        const worker = await Client.findByIdAndUpdate(req.user._id, req.body);
        res.status(200).json({ message: "Updated" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.user._id, req.body);
        res.status(200).json({ message: "Client Deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const request = async (req, res) => {
    try {
        const { category, reqToClient } = req.body;

        await Client.findOneAndUpdate(
            { username: req.user.username },
            { category: req.body.category, reqToClient: req.body.reqToClient },
            {
                new: true,
            }
        );

        res.status(200).json({ message: "success" });
    } catch (error) {
        console.log(error);
        // res.status(400).json({ message: error.message });
    }
};
const ongoingRequest = async (req, res) => {
    try {
        const userData=await Client.findOne({username:req.user.username})
        res.status(200).json({ message: userData});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const clientQuotePrice = async (req, res) => {
    try {
        const { username, price } = req.body; //worker ka username chaiye
        await Communication.findOneAndUpdate(
            { usernameClient: username },
            { priceByClient: price }
        );
        await Communication.findOneAndUpdate(
            { usernameClient: username },
            { usernameWorker: req.user.username }
        );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const clientGetPrice = async (req, res) => {
    try {
        const { username } = req.body; //worker ka username chaiye
        const user = await Communication.findById(username._id);
        res.status(200).json({ message: user.priceByClient });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}
const accept=async(req,res)=>{
    try{
        const {username}=req.body //worker ka username needed
        const adminLog=new AdminLog({
            client_id:req.user.username,
            worker_id:username
        })
        await adminLog.save()
        
    } catch(err){
        res.status(400).json({message:err.message})
    }
}


module.exports = {

    newClient,
    updateClient,
    deleteClient,
    request,
    ongoingRequest,
    clientQuotePrice,
    clientGetPrice,
};
