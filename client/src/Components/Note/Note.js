import React from 'react';
import './Note.css';

import { useState } from "react";
import{useHistory} from 'react-router-dom';


export default function Note(){

    
const [inputs, setInputs] = useState({});
const history= useHistory();

const apiPost = async () => {
   try{ 
    const res = await fetch("api/notes", {
      method: "POST",
      body: JSON.stringify({
        title: inputs.title,
        content: inputs.content,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    console.log(res.status)  
    }
    catch{
      console.log("note not posted")
    }
     

  };

  const handleChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,

      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    apiPost();
    console.log(inputs);
  };

    return(<form className="input-new-note" onSubmit={handleSubmit}>
        <input 
            type="text"
            name="title" 
            placeholder="Title"
            onChange={handleChange} 
        />
        <br/>
        <textarea 
            id="content" 
            name="content" 
            placeholder="notes" 
            rows="5" cols="50"
            onChange={handleChange}  
        > 
             </textarea>
        <br/>
        <input 
            type="submit" 
            value="save" 
            onChange={handleChange}
        />
    </form>);
}