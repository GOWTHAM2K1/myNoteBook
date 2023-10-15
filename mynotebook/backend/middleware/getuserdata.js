const jwt = require('jsonwebtoken');
const JWT_SEC = "this is a secret web token";

const getuser = (req,res,next)=>{
    const authtoken = req.header('auth-token')
    if(!authtoken){
        res.send("correct auth token reuired")
    }
    try{
    const verify = jwt.verify(authtoken,JWT_SEC) // this one returns the user id from database if the authtoken is correct (refer login.js)
    // console.log(verify)
    req.user = verify.user
    next()
    }catch(err){
        console.log(err)
        res.send("correct auth token reuired")

    }
}





module.exports = getuser;