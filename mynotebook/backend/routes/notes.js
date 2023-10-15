const express = require('express');
const router = express.Router();
const getuserdata = require('../middleware/getuserdata.js')
const Notes = require('../models/Notes.js')
const { body, validationResult } = require('express-validator');


// creates the notes 
router.post('/addnotes',
getuserdata,
[
  body('title').isLength({min:3}),
  body('description').isLength({min:5}),
], 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors){
    console.log("error")
    res.send("error")
  }
  const {title,description,tag} = req.body;
  try{
    const notes = new Notes({
      userid:req.user.id,
      title:title,
      description:description,
      tag:tag
    })
    notes.save()
    res.send(notes)
  }catch(err){
    console.log(err)
  }
  
});

//fetches all notes
router.get('/fetchallnotes',getuserdata,async (req,res)=>{
  try{
      const userid = req.user.id // gets userid (authtoken consists of id in encrypted format ig) from header 
      const allnotes = await Notes.find({userid:userid})
      res.send(allnotes)
  }catch(err){
      console.log(err)
  }
})


router.put('/updatenotes/:id',getuserdata,[
  body('title').isLength({min:3}),
  body('description').isLength({min:5}),
],async (req,res)=>{
  const {title,description,tag} = req.body
  const id = req.params.id //gets id from param
  try{
    const user =await Notes.findById(id)
    if(!user){
      return res.status(400).send("error")
    }

    // console.log(user.userid.toString(),req.user.id) 
    if(user.userid.toString()===req.user.id){
      const update = {}
      if(title){update.title = title}
      if(description){update.description = description}
      if(tag){update.tag = tag}

      const updatequery =await Notes.findByIdAndUpdate(id,{$set:update},{new:true})
      res.send(updatequery)
      }else{
        res.send("not working")
      }
      
    }catch(err){
    console.log(err)
  }

})


// to delete an existing note by using its id which is input parameter

router.delete('/deletenote/:id',getuserdata,async (req,res)=>{
  const id = req.params.id //gets id from param
  try{
    const user =await Notes.findById(id)
    if(!user){
      return res.status(400).send("error")
    }
    // console.log(user.userid.toString(),req.user.id) 
    if(user.userid.toString()===req.user.id){
      console.log("in")
      const deletequery =await Notes.findByIdAndDelete(id)
      res.send(deletequery)
      }else{
        res.send("cannot delete")
      }
      
    }catch(err){
    res.status(500).send("internal error")
    console.log(err)
  }

})
module.exports = router;
