
const create_note = async (app,newItem)=>{
    const result = app.currentUser.functions.createNote(newItem);
    return result;
}

const get_allnotes = async (app,userID)=>{
    return app.currentUser.functions.getallnotes0(userID)
    .then((res)=>res);
}

const delete_note = async(app,noteID)=>{
    const result = await app.currentUser.functions.deleteNote(noteID.toString());
    return result;
}

const edit_note = async(app,noteID,update)=>{
    const result = await app.currentUser.functions.editNote(noteID.toString(),update);
    return result;
}

const create_many = async (app,items,userid)=>{
    var objArray = items;
    objArray.forEach(obj=>obj.userID = userid)
    const res = await app.currentUser.functions.createMany(objArray);
    return res;
}

const send_mail = async (app,usermail,file,url)=>{
    const res = await app.currentUser.functions.sendMail(usermail,file,url);
    return res;
}

export {
        create_note,
        get_allnotes,
        delete_note,
        edit_note,
        create_many,
        send_mail,
        }