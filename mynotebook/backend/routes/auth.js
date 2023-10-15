const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getuserdata = require('../middleware/getuserdata.js')
const JWT_SEC = "this is a secret web token";

// Handle POST request
router.post('/createuser',[
  body('name').isLength({min:1}),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors){
    console.log("error")
    res.send("error")
  }
  try{
    const exist = await User.findOne({email:req.body.email})//to check weather a email exist in db
    if(exist){
      return res.status(400).json({error:"soory an user with this email exist "})
    }
  const saltRounds = 10;
  const sec_password = req.body.password
  const salt =await bcrypt.genSaltSync(saltRounds);
  const hash =await bcrypt.hashSync(sec_password, salt);

  let user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hash
  })
  
  const data = {
    user:{
      id:user._id
    }
  }

  // res.send(data)data stores the user from mongo db
  // console.log(user)
  const authToken = jwt.sign(data, JWT_SEC);
  // res.send(user)
  res.send({authToken})
  }catch(error){
    res.json({error: error.message})
  }
})

//too login
router.post('/login',[
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
if(!errors){
  console.log("error")
  res.send("error")
}

const {email,password} = req.body;
try{
  // console.log("in try")
  const exist = await User.findOne({email:email})//to check weather a email exist in db //here exist extracts and stores the data from database
  if(!exist){
      return res.send("please enter correct credentials")
  }
  const compare = await bcrypt.compareSync(password, exist.password);
  if(!compare){
    return res.status(400).send("please enter correct credentials")
  }
  // console.log("success")
  const data = {
    user:{
      id:exist._id
    }
  }
  const authToken = jwt.sign(data, JWT_SEC);
// res.send(user)
res.send({authToken})

}catch(err){
  res.send(err,"please enter valid credentials")
}})


//to get the user



router.post('/getuser',getuserdata,async (req,res)=>{
  try{
  const userid = req.user.id
  const user = await User.findById(userid).select("-password")
  res.send(user)
}catch(err){
  console.log(err)
  res.status(401).send("enter valid token")
}
})


module.exports = router;
