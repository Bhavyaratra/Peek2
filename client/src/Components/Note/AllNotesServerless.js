import React from 'react';
import {useEffect,useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

export const AllNotes = (props)=>{

  const useStyles = makeStyles((theme) => ({
    card: {
      display: 'Inline',
      minWidth: 275,
      boxShadow: '0 3px 5px 2px rgba(22, 21, 21, .3)',
      marginTop: 10,
      background: 'rgb(39, 39, 39)',
      color: 'white',
      borderRadius: '8px',
      transition: 'transform .2s',
      '&:hover':{
        transform: 'scale(1.1)',
      },
      '&:focus':{
        background: 'red'
      }
             
    },
    TextArea:{
      background: '#272727',
      border: '#272727',
      resize: 'none',
      color: 'white',
      fontFamily: 'calibri',
     
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
    btn:{
      marginLeft:'5%',
      background: '#09804c',
      fontWeight:'bold',
      '&:hover':{
        background: '#13aa52'
      }
    }

  }));

//*functions
const classes = useStyles();
    const [count,setCount] = useState(0);
    const [data, setdata] = useState([]);
    const [input,setInput] = useState({
      id:"",
      title:"",
      content:""
    });

    useEffect(()=>{
      console.log("getnote")
      console.log(props.userID)
      props.app.currentUser.functions.getallnotes0(props.userID)
      .then(result=>{
        setdata(result)
      })
    },[count,props.newNote]);

    function handleSelect(id,title,content,userID){
      if(input.id !== id){
        setInput({...input,
          id: id,
          title: title,
          content: content,
          userID: userID
        });
      }
    }
        
    function handleChange(target){
        setInput ({ ...input,
        [target.name]: target.value,
      })
    }

    //* Delete function
    async function del(id){
      console.log(id.toString());
      const result = await props.app.currentUser.functions.deleteNote(id.toString());
      console.log(result);
      setCount(count=>count+1);
    }
    
    //* Edit function  
    async function edit(note_id){
      const update = {
        title: input.title,
        content: input.content,
        userID: input.userID 
      }
      const result = await props.app.currentUser.functions.editNote(note_id.toString(),update);
      console.log(result);
    }  

    return(<div >
      <Link style={{ textDecoration: 'none' }} to="/filedata">
        <Button className={classes.btn}>File Data</Button>
      </Link>
        <h1>ALL NOTES</h1>
        {/* <ul className="list"> */}
            
            {data.map((notes)=>(
                <div className="card" key={notes._id} >
               
            <Card variant='outlined' className={classes.card}>
                <CardContent className="elements">

                <TextareaAutosize
                  id={notes._id}
                  autoComplete="off"
                  label="Standard"
                  name="title"
                  className={classes.TitleArea} 
                  defaultValue={notes.title}
                  onChange={ (e)=>handleChange(e.target)}
                  onSelect={(e)=>handleSelect(notes._id,notes.title,notes.content,notes.userID)}
                />
                <br/>
                <TextareaAutosize
                    id={notes._id}
                    autoComplete="off"
                    name="content" 
                    className={classes.TextArea}
                    aria-label="minimum height" 
                    defaultValue={notes.content}
                    onChange={(e)=>handleChange(e.target)}
                    onSelect={(e)=>handleSelect(notes._id,notes.title,notes.content,notes.userID)}
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
        </div>)

}