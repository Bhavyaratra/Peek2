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

module.exports = {
    start,
    show,
    save,
    getNote,
    deleteNote,
    patchNote
}