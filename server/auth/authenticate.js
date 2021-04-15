const jwt = require("jsonwebtoken");
const user = require("../models/users");

const authenticate =async (req,res,next)=>{

    try{
        const token = req.cookies.jwt;
        console.log("hey")
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(token);
        // console.log(verifyUser);
        const loggeduser = await user.findOne({_id:verifyUser._id})
         
        req.token = token;
        next();
        
      
        

    }catch(error){
        console.log("Errorrrr")
        res.status(400);
    }
}

module.exports= authenticate;