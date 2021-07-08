import React from 'react';
import './Styles/Note.css';
import { useState} from "react";
import { AllNotes } from './AllNotesServerless';
import { useEffect } from 'react';

export const Note =(props)=>{

const [userid,setUserid]= useState(""); 
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [newnote, setNewnote] = useState({});

useEffect(()=>{
  let userstring = localStorage.getItem('user');
  setUserid(userstring);
},[])

const apiPost = async () => {
  console.log(userid)
  const newItem={
    title: title,
    content: content,
    userID: userid
  }
  const result = props.app.currentUser.functions.createNote(newItem);
  setNewnote(newItem);
  setTitle("");
  setContent("");
  console.log(result)
};


  const handleSubmit =  (event) => {
    event.preventDefault();
    apiPost();
  };

    return(
      <div>
    <form className="input-new-note" onSubmit={handleSubmit}>
        <input 
            type="text"
            id="standard-required"
            name="title" 
            required
            placeholder="Title"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}} 
        />
        <br/>
        <textarea 
            id="standard-required" 
            name="content" 
            required
            placeholder="notes..." 
            value={content}
            rows="5" cols="50"
            onChange={(e)=>{setContent(e.target.value)}}  
        > 
             </textarea>
        <br/>
        <input 
            type="submit" 
            value="save" 

        />
    </form>
    <br/>
    <AllNotes newNote={newnote} userID={userid} app={props.app}/>
    </div>
    );


}