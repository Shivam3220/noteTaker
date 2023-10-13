const express = require("express");
const UserSchema = require("../db/Schemas/UserSchema")
const router = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post("/add-user",async (req,res)=>{
    const{name, email, password, cpassword} = req.body;
    if(password===cpassword){
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = await UserSchema.findOne({"email":email})
            if(!user){
                const userAdded = await UserSchema.create({name:name , email:email , password:hashedPassword})
                var token = jwt.sign({"id":userAdded.id,"name":userAdded.name}, process.env.SECRET);
                res.status(200).send({"message":"user added successfuly","code":200 , user:token})
            }else{

                res.status(500).send({"message":["User Already exists"],"code":400})
            }
        } catch (error) {
            res.status(500).send({"message":["please enter valid credentials"],"code":400})
        }
    }else{
        res.status(400).send({"message":["Passwords are not same"],"code":400})
    }
})


router.post("/check-token",async (req,res)=>{
        try {
            var decoded = jwt.verify(req.body.token,  process.env.SECRET);
            res.status(200).send({"message":"token verified",user:decoded,"code":200})
        } catch (error) {
            res.status(500).send({"message":["token expire"],"code":400})
            // console.log(error)
        }
})

router.post("/log-in",async (req,res)=>{
    const{email, password} = req.body;
        try {
           const user = await UserSchema.findOne({"email":email})
           const checkpass = await bcrypt.compare(password, user.password)
           if(checkpass){
            var token = jwt.sign({"id":user.id , "name":user.name}, process.env.SECRET);
            res.status(200).send({"message":"you are logged in","token": token, "data":{"id":user.id , "name":user.name}, "code":200})
           }else{
            res.status(200).send({"message":"please enter valid credentials" , "code":400})
           }
           
        } catch (error) {
            res.status(500).send({"message":"","code":400})
            // console.log(error)
        }
})

module.exports = router