import React from 'react';
import '../Note/Styles/Note.css';
import { useState} from "react";
import { downloadPDF } from '../../Functions/downloadPdf';

export const Weatherapi =(props)=>{


const [url, setUrl] = useState("");
const [data, setData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch('http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=04f2abaebeeb301163bd2c4e1190f5ae')
    .then(res=>
        res.json()
    )
    .then((d)=>{
        console.log(d);
    }).catch((err)=>{
        console.log(err);
    })
  };

    return(
      <div>
          
    <form className="input-new-note" onSubmit={handleSubmit}>
       
        <br/>
        <input className="pdf-btn"
            type="submit" 
            value="get data from api" 

        />
    </form>

    {url? <span><a href = {url}  className="link">Download Pdf</a>
      </span> 
        :
    <span></span>}
    </div>
    );


}