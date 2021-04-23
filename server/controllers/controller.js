
const note = require('../models/notes');
const user = require('../models/users');
const cookie = require('cookie');


const start =(req,res)=>{
    res.send('Starting api page');

}

const show = async (req,res)=>{
    note.find({userID:req.user._id}).sort({createdAt: -1})
    .then((result)=>{
        res.json( result);
    })
    .catch((err)=>{
        res.send('400'+err);
    })
}

const showAllNotes = async (req,res)=>{
    note.find().sort({createdAt: -1})
    .then((result)=>{
        res.json( result);
    })
    .catch((err)=>{
        res.send('400'+err);
    })
}

const getNote = (req,res)=>{
    const id = req.params.id;
    console.log(id);
    note.findById(id)
     .then(result => {
         res.json(result);
     })
     .catch(err => {
        res.status('400').json('400');
      });
}

const deleteNote = async (req,res)=>{

    const id = req.params.id;
    note.findByIdAndDelete(id)
    .then(()=>{
      
    })
    .catch(()=>{
        console.log("error while deleting");
    })
}

const patchNote= async (req,res)=>{
    const id= req.params.id;
    try{
        const editNote = await note.findByIdAndUpdate(id)
        try{
        editNote.title = req.body.title
        editNote.content = req.body.content
        editNote.save()
        .then((result)=>console.log(result))
        .catch((error)=>console.log(error+" id not found"))
        }
        catch(error){
            console.log(error);
        }
    }
    catch{
        console.log("not updated"); 
    }
}

const save = async (req,res)=>{
    console.log("post");
    const newnote = new note(req.body);
    newnote.userID = req.user._id;
    newnote.save()
    .then((result)=>{
        console.log('note saved');
    })
    .catch((err)=>{
        res.status('400')
        console.log(err);
    })
    console.log(newnote);
}

/////////////////////////////////////////////////////////////////////
// * User Controller

const getUser = async (req,res)=>{
    const id = req.params.id;
    user.findById(id)
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
}
const showUser = async (req,res)=>{
    user.find().sort({createdAt: -1})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
}

const saveUser = async (req,res)=>{
    const newUser = new user(req.body);
    const userExist = await user.findOne({email: newUser.email});
    if(!userExist)
    {
        if(newUser.password===newUser.password2){
            const token =await newUser.generateAuthToken();
            console.log(token);
            res.status('200').json("registered");
          }
          else{
              res.status('400').json('password does not match');
          }
    }
    else {
        res.status('400').json('Email already exists');
    }
    
}

const loginUser = async (req,res)=>{

    const loginEmail = req.body.email;
    const loginPassword = req.body.password;
    try{
        const result = await user.findOne({email: loginEmail});
 
        if(result.password===loginPassword){
                let token =await result.generateAuthToken();
            
                res.cookie("jwt",token,{
                    httpOnly:false,
                });
                res.status(200).json("user logged in");
                console.log(result.name+" loggedin")
                //! redirect to home page       
            }   
        else{
            res.status('400').json("wrong credentials");
            console.log("wrong cred")
        }     
    }
    catch{
        res.status('400').json("wrong credentials");
        console.log("wrong email")
    }
}

const logoutUser = async (req,res)=>{
    res.clearCookie('jwt',{path:'/'});
    res.status(200).send('logout');
}


module.exports = {
    start,
    showAllNotes,
    show,
    save,
    getNote,
    deleteNote,
    patchNote,

    saveUser,
    loginUser,
    showUser,
    getUser,
    logoutUser,

}