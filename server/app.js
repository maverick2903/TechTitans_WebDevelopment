const cookieParser=require('cookie-parser')
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app=express()
const dotenv=require('dotenv').config()
const user=require('./routes/user.routes')
const client=require('./routes/client.routes')
const worker=require('./routes/worker.routes')
require('./dbConnect')
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const whitelist = [""];
const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
    credentials: true,
};
if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: true, credentials: true }));
} else {
    app.use(cors(corsOptions));
}
app.use("/user", user);
app.use("/client",client)
app.use("/worker",worker)



app.use((req, res, next) => {
    res.status(404).json({
        error: "not found",
    });
});

app.listen(5000, () => console.log("server listening on 5000"));