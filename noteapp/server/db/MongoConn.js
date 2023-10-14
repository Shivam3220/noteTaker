const mongoose = require("mongoose");
require("dotenv").config();


connectToMongo=()=>{
  mongoose.connect("mongodb+srv://sunifi12:Y8B6NBTzUr71DXcJ@noteapp.wkk6pk8.mongodb.net/note-app",{
    useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true
  })
  .then(()=>console.log("dataBase connected sucessfully"))
  .catch((err)=>console.log(err))

}

module.exports=connectToMongo;
