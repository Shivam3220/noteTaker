const express = require("express");
const NoteSchema = require("../db/Schemas/NoteSchema")
const router = express.Router()


router.post("/add-note",async (req, res)=>{
    try {
        // const {Title ,Description ,User_id} = req.body
        if(req.body.user_id){
            const addnote = new NoteSchema(req.body);
            const noteAdded = await addnote.save()
            res.status(200).send({"message":"note added successfully", "code":200})
        }else{
            res.status(400).send({"message":["user is not valid"], "code":400}) 
        }
    } catch (error) {
        res.status(400).send({"message":["server error please try again later"], "code":400}) 
    }

})


router.post("/get-notes",async (req, res)=>{
    try {
        // const {User_id} = req.body
        const allNotes = await NoteSchema.find(req.body);
        res.status(200).send({"message":"notes fetched successfuly", "code":200 ,"data":allNotes})
    } catch (error) {
        res.status(400).send({"message":["server error please try again later"], "code":400}) 
    }

})


router.post("/delete-note",async (req, res)=>{
    try {
        // const {user_id} = req.body
        const Note = await NoteSchema.findOne({"_id":req.body.id});
        if(Note.user_id===req.body.user_id){
            const delNote = await NoteSchema.deleteOne({"_id":req.body.id})
            res.status(200).send({"message":"note deleted successfuly", "code":200 })
        }else{
            res.status(400).send({"message":["user is not valid"], "code":400})
        }
    } catch (error) {
        res.status(400).send({"message":["server error please try again later"], "code":400}) 
    }

})



router.post("/update-note",async (req, res)=>{
    try {
        // const {user_id} = req.body
        const Note = await NoteSchema.findOne({"_id":req.body._id});
        if(Note.user_id===req.body.user_id){
            const updateNote = await NoteSchema.updateOne({"_id":req.body._id},req.body)
            res.status(200).send({"message":"note updated successfully", "code":200 })
        }else{
            res.status(400).send({"message":["user is not valid"], "code":400})
        }
    } catch (error) {
        res.status(400).send({"message":["server error please try again later"], "code":400}) 
    }

})

module.exports = router