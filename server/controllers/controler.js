const notes = require('../models/notes');
const note = require('../models/notes');

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

const updateNote= async (req,res)=>{
    const id= req.params.id;
    notes.findByIdAndUpdate(id)
    .then((result)=>{
        console.log(result);
    })
    .catch(()=>{
        console.log("not updated"); 
    })
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

module.exports = {
    start,show,save,getNote,deleteNote,updateNote,
}