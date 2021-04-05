const note = require('../models/notes');

const start =(req,res)=>{
    res.send('Starting api page');
}

const show = (req,res)=>{
    note.find()
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.send('404'+err);
    })
}

const save = (req,res)=>{
    newnote = new note;
    console.log(newnote);
}

module.exports = {
    start,show,save,
}