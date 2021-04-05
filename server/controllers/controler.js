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
    start,show,save,
}