// const pkg = require("mongoose");
import pkg from "mongoose";

const { Schema, model } = pkg;

const User = new Schema({
  name: { type: String, unique: false, required: true },
  instagram: { type: String, unique: false, required: true }, 
  phone: { type: Number, unique: false, required: false }, 
  email:{type: String, unique: false, required: false }
});

export default model("User", User);
