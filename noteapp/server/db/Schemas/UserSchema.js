const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserDetails = new Schema({
    name: String,
    email:{type:String ,  unique: true, required: true},
    password: String,
    date: { type: Date, default: Date.now },
})


module.exports= mongoose.model("UserDetails",UserDetails);