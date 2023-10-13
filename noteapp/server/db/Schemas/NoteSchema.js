const mongoose = require("mongoose");
const { Schema } = mongoose;

const notes = new Schema({
    Title: String,
    Description:String,
    user_id: String,
    Date: { type: Date, default: Date.now },
})


module.exports= mongoose.model("notes",notes);