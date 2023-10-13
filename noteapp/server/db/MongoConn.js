const mongoose = require("mongoose");
require("dotenv").config();


connectToMongo=()=>{
  mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true
  })
  .then(()=>console.log("dataBase connected sucessfully"))
  .catch((err)=>console.log(err))

}

module.exports=connectToMongo;