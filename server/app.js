const cookieParser=require('cookie-parser')
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app=express()
const dotenv=require('dotenv').config()
const user=require('./routes/user.routes')
require('./dbConnect')
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/user", user);

app.use((req, res, next) => {
    res.status(404).json({
        error: "not found",
    });
});

app.listen(5000, () => console.log("server listening on 5000"));