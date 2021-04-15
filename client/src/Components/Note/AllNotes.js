
import React from 'react';
import {useEffect,useState} from 'react';
import{useHistory} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';

// TODO OnChange execute edit function and save 

export const AllNotes = ()=>{

    const history= useHistory();
    const [data, setdata] = useState([]);
    const [input,setInput] = useState({
      id:"",
      title:"",
      content:""
    });

    useEffect(()=>{
     fetch('/api/notes').then(res=>{
            if(res.status!=='400'){
                return res.json()
            }
            else{
              history.push("/login");
            }
        }).then(data =>setdata(data))
        .catch((err)=>{
          history.push("/login");
        })
    });

    useEffect(()=>{
        console.log(input);
    },[input]);

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'Inline',
          minWidth: 275,
          boxShadow: '0 3px 5px 2px rgba(22, 21, 21, .3)',
          marginTop: 10,
          background: 'rgb(39, 39, 39)',
          color: 'white',
          borderRadius: '8px',
        },
        TextArea:{
          background: '#272727',
          border: '#272727',
          resize: 'none',
          color: 'white',
          fontFamily: 'calibri'
        },
        TitleArea:{
          background: '#272727',
          border: '#272727',
          resize: 'none',
          color: 'white',
          fontFamily: 'calibri',
          fontSize: 'large',
          fontWeight: 'bold'
        },
        FloatRight:{
          float:'right',
          color: 'crimson', 
        },

      }));

    const classes = useStyles();

    async function del(id){
        console.log(id);
       await fetch('/api/notes/'+id,{method: 'DELETE'})
        .then(()=>console.log("deleted "+id))
        .catch(()=>console.log("not deleted"));
      }

      function handleSelect(id,title,content){
        if(input.id !== id){
          setInput({...input,
            id: id,
            title: title,
            content: content
          });
          
        }

      }
        
      function handleChange(target){
        
         setInput ({ ...input,
          [target.name]: target.value,
          
        })

      }
  
    async function edit(id){
      console.log(id);
      if(input.id===id){
        await fetch('/api/notes/'+id,{
          method: 'PATCH',
          body:JSON.stringify({
            title:input.title,
            content:input.content 
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          
        })
        .then(()=>{
          console.log(" found and edited");
        })
        .catch(()=>{
          console.log("not edited")
        })
     }
    }  

    return(<div >
        <h1>ALL NOTES</h1>
        {/* <ul className="list"> */}
            
            {data.map((notes)=>(
                <div className="card" key={notes._id} >
            <Card className={classes.root}>
                <CardContent className="elements">

                <TextareaAutosize
                  id={notes._id}
                  label="Standard"
                  name="title"
                  className={classes.TitleArea} 
                  defaultValue={notes.title}
                  onChange={ (e)=>handleChange(e.target)}
                  onSelect={(e)=>handleSelect(notes._id,notes.title,notes.content)}
                />
                <br/>
                <TextareaAutosize
                    id={notes._id}
                    name="content" 
                    className={classes.TextArea}
                    aria-label="minimum height" 
                    defaultValue={notes.content}
                    onChange={(e)=>handleChange(e.target)}
                    onSelect={(e)=>handleSelect(notes._id,notes.title,notes.content)}
                />    

                </CardContent >

                <IconButton aria-label="delete" className={classes.FloatRight} onClick={()=>del(notes._id)} >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="SveRoudedIcon" className={classes.FloatRight} onClick={()=>edit(notes._id)} >
                  <SaveRoundedIcon fontSize="small" />
                </IconButton>

            </Card>
            </div>
            ))}

            
            
        {/* </ul>  */}
        </div>)

}