import React from 'react';
import './Note.css';

import { useState } from "react";


export default function Note(){

    
const [title, setTitle] = useState("");
const [content, setContent] = useState("");

const apiPost = async () => {
      fetch("api/notes", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(res=>{
      console.log(res)
      setTitle("");
      setContent("");
    })
    .catch((err)=>{
      console.log(err.message)
    })

  };


  const handleSubmit =  (event) => {
    event.preventDefault();
    apiPost();
  };

    return(<form className="input-new-note" onSubmit={handleSubmit}>
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
    </form>);
}