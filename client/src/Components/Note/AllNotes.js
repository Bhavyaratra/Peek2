
import React from 'react';
import {useEffect,useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';



export const AllNotes = ()=>{
    const [data, setdata] = useState([])

    useEffect(()=>{
     fetch('/api/notes').then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(data =>setdata(data))
    });

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'Inline',
          minWidth: 275,
          boxShadow: '0 3px 5px 2px rgba(22, 21, 21, .3)',
          marginTop: 10,
          background: 'rgb(39, 39, 39)',
          color: 'white',
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

    return(<div >
        <h1>ALL NOTES</h1>
        {/* <ul className="list"> */}
            
            {data.map((notes)=>(
                <div className="card" key={notes._id} >
            <Card className={classes.root}>
                <CardContent className="elements" >

                <TextareaAutosize
                  id="standard-basic"
                  label="Standard"
                  className={classes.TitleArea} 
                  defaultValue={notes.title}
                />
                <br/>
                <TextareaAutosize 
                    className={classes.TextArea}
                    aria-label="minimum height" 
                    defaultValue={notes.content}
                />    

                </CardContent>

                <IconButton aria-label="delete" className={classes.FloatRight} onClick={()=>del(notes._id)} >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete" className={classes.FloatRight} onClick={()=>console.log("edited")} >
                  <SaveRoundedIcon fontSize="small" />
                </IconButton>

            </Card>
            </div>
            ))}

            
            
        {/* </ul>  */}
        </div>)

}