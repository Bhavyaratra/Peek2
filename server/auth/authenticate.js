const jwtt = require("jsonwebtoken");
const user = require("../models/users");

const authenticate =async (req,res,next)=>{

    try{
    
        const token = req.cookies.jwt;
        const verifyUser = await jwtt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyUser);
        const loggeduser = await user.findOne({_id:verifyUser._id})
         
        req.token = token;
        next();
        
    }catch(error){
        console.log("Error\n"+error)
        res.status('400');
    }
}

module.exports= authenticate;