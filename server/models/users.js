const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    password2:{
        type: String,
        require: true,
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
  },
   {timestamps: true}
);

UserSchema.methods.generateAuthToken =async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
        this.tokens= this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(error){
        console.log("genAuthToken "+error);
    }
}


const users = mongoose.model('User',UserSchema);

module.exports=users;
