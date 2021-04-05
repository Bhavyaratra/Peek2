import React from 'react';
import './Note.css';

import { useState } from "react";


export default function Note(){

    
const [inputs, setInputs] = useState({});

const apiPost = async () => {
    
    await fetch("api/notes", {
      method: "POST",
      body: JSON.stringify({
        title: inputs.title,
        content: inputs.content,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
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

    return(<form onSubmit={handleSubmit}>
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