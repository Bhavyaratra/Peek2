import React from 'react';
import '../Note/Styles/Note.css';
import { useState} from "react";
import { downloadPDF } from '../../Functions/downloadPdf';
import {send_mail} from '../../Functions/realm';

export const GeneratePDF =(props)=>{


const [url, setUrl] = useState("");
const [file, setFile] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(text);
    downloadPDF(props.app,'temp').then((res)=>{
        setUrl(res.url);
        setFile(res.file);
    })
  };

  const sendMail = async (event)=>{
    event.preventDefault();
    let usermail = event.target.usermail.value;
    send_mail(props.app,usermail,file,url).then((res)=>{
      console.log(file);
      console.log("sent mail!");
      console.log(res);
    });
  }
    return(
      <div>
          
    <form className="input-new-note" onSubmit={handleSubmit}>
       
        {/* <textarea 
            id="standard-required" 
            name="content" 
            // required
            placeholder="input text..." 
            value={text}
            rows="25" cols="100"
            onChange={(e)=>{setText(e.target.value)}}  
        > 
        </textarea> */}
        <br/>
        <input className="pdf-btn"
            type="submit" 
            value="generate pdf" 

        />
    </form>

    {url? <span><a href = {url}  className="link">Download Pdf</a>
    <form className="input-new-note" onSubmit={sendMail}>
       <br/>
       <input type="text" name="usermail" placeholder="enter your mail"/> 
       <input className="pdf-btn"
           type="submit" 
           value="send-mail" 

       />
      </form> 
      </span> 
        :
    <span></span>}
    </div>
    );


}