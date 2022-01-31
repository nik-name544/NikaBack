// const express = require("express");
import express from "express";
// import run from "googleapis/build/src/apis/run.js";
import mongoose from "mongoose";
import router from "./router.js";
import cors from "cors";
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// import * as ttttttttt from "./nikaweb-6ee99c657bc0.json";
// const mongoose = require("mongoose");

// const router = require("./router");
// const ddate = new Date();
// const Date = Date.now();

const app = express();
app.use(cors(corsOptions));
const DB_URL =
  "mongodb+srv://nik:faeb2eb2eb@cluster0.ywx7b.mongodb.net/<NikaBack>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/", router);
// app.use("/", router);

const start = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log(`all ok ${PORT}`));
    // console.log(ddate);
    // run();
    // console.log(tttt.type, "sksks");
    // console.log(JSON.parse(ttttttttt), "llll");
    // console.log(parseJ(tttt),'sksks');
  } catch (error) {
    console.log(error);
  }
};

start();
