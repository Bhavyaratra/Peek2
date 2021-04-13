
const note = require('../models/notes');
const user = require('../models/users');
const cookie = require('cookie');

const start =(req,res)=>{
    res.send('Starting api page');

}

const show = async (req,res)=>{
    note.find().sort({createdAt: -1})
    .then((result)=>{
        res.json( result);
    })
    .catch((err)=>{
        res.send('404'+err);
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
        res.render('404');
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
        const note = await notes.findByIdAndUpdate(id)
        note.title = req.body.title
        note.content = req.body.content
        note.save()
        .then((result)=>console.log(result))
        .catch((error)=>console.log(error+" id not found"))
    }
    catch{
        console.log("not updated"); 
    }
}

const save = async (req,res)=>{
    console.log("post");
    const newnote = new note(req.body);
    newnote.save()
    .then((result)=>{
        console.log('note saved');
    })
    .catch((err)=>{
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
    console.log('use');
    if(!userExist)
    {
        if(newUser.password===newUser.password2){
            const token =await newUser.generateAuthToken();
            newUser.tokens= newUser.tokens.concat({token: token})
            newUser.save()
            .then((result)=>{
                res.json(result);
            })
            .catch((err)=>{
                res.json(err);
            })
          }
          else{
              res.json('password does not match')
          }
    }
    else {
        res.json('Email already exists')
    }
    
}

const loginUser = (req,res)=>{
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    user.findOne({email: loginEmail})
    .then((result)=>{
         if(result.password===loginPassword){
            const token = result.generateAuthToken();

            res.cookie("jwt",token,{
                httpOnly:true
            });
            res.send("user logged in");
            //! redirect to home page

         }
         else{
             res.json("wrong password");
         }
    })
    .catch(()=>{
        res.send("Email not found");
    })

}


module.exports = {
    start,
    show,
    save,
    getNote,
    deleteNote,
    patchNote,

    saveUser,
    loginUser,
    showUser,
    getUser,

}