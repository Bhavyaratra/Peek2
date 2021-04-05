
import React from 'react';
import {useEffect,useState} from 'react';

export const AllNotes = ()=>{
    const [data, setdata] = useState([])

    useEffect(()=>{
     fetch('/api/notes').then(res=>{
            if(res.ok){
              console.log(res);
      
                return res.json()
            }
        }).then(data =>setdata(data))
    })

    console.log(data)
    return(<div>
        <h1>ALL NOTES</h1>
        <ul className="list">
            {data.map((notes)=>(
                <li className="elements" key={notes.id}>
                    <h2>{notes.title}</h2>
                    {notes.content}
                    <hr/>
                </li>
            ))}
            
        </ul> 
        </div>)

}