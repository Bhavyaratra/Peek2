const note = require('../models/notes');

const start =(req,res)=>{
    res.send('Starting api page');

}

const show = (req,res)=>{
    note.find()
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
        console.log("deleted")
    })
    .catch(()=>{
        console.log("error while deleting");
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
    start,show,save,getNote,deleteNote,
}