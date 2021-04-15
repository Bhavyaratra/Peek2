const jwtt = require("jsonwebtoken");
const user = require("../models/users");

const authenticate =async (req,res,next)=>{

    try{
    
        const token = req.cookies.jwt;
        const verifyUser = await jwtt.verify(token, process.env.SECRET_KEY);
         //console.log(verifyUser);
         const loggedUser = await user.findOne({_id:verifyUser._id})
        // console.log(loggedUser);
         
        if(!loggedUser) {
            throw new Error("user not found")
        }
        req.token = token;
        req.user = loggedUser;
        req.userID = loggedUser._id; 

        next();
        
    }catch(error){
        console.log("Error\n"+error)
        res.status('400').send("no token provided");
    }
}

module.exports= authenticate;