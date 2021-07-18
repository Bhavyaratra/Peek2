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

import { get_allnotes, delete_note, edit_note } from '../../Functions/realm';
import { downloadPdfTable } from '../../Functions/downloadPdfTable';
import { downloadExcel } from '../../Functions/downloadExcel';

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
      marginRight:'5%',
      background: '#09804c',
      fontWeight:'bold',
      '&:hover':{
        background: '#13aa52'
      }
    },
    btn_dwnld:{
      marginRight: '10px',
      background:'#0079f1',
      fontWeight:'bold',
      '&:hover':{
        background: '#1da1f2'
      }
    },
    link:{
      textDecoration: 'none',
      color: '#29099c',
     
      fontSize: '18px',
      fontStyle:'bold',
      padding: '4px'

    }

  }));


const classes = useStyles();

    const [count,setCount] = useState(0);
    const [data, setdata] = useState([]);
    const [input,setInput] = useState({
      id:"",
      title:"",
      content:""
    });
    const [pdfurl,setPdfurl] = useState("");
    const [xlurl,setXlurl] = useState("");
    
    //* getallnotes0()
    useEffect(()=>{
      if(props.userID){
      get_allnotes(props.app,props.userID)
      .then(result=>{
        setdata(result)
      })}
    },[count,props.newNote,props.userID]);

    //updates input state when selecting a card of notes
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
    
    //updates input state when changing data in a card of notes
    function handleChange(target){
        setInput ({ ...input,
        [target.name]: target.value,
      })
    }
     
    
    return(<div >
      <Link style={{ textDecoration: 'none' }} to="/filedata">
        <Button className={classes.btn}>File Data</Button>
      </Link>
    
      <Link style={{ textDecoration: 'none' }} to="/generatepdf">
        <Button className={classes.btn}>Generate-Pdf</Button>
      </Link>

      <Link style={{ textDecoration: 'none' }} to="/inputpdf">
        <Button className={classes.btn}>Text-Pdf</Button>
      </Link>
    
        <Button className = {classes.btn_dwnld}
                onClick={async ()=>downloadExcel(props.app,data).then((res)=>{
                  setXlurl(res);
                }
                )}>excel
        </Button>
        <Button className = {classes.btn_dwnld}  //*Import notes to PDF and Download
                onClick={async ()=>downloadPdfTable(props.app,data).then((res)=>{
                  setPdfurl(res);
                  console.log(data);
                }
                )}>pdf  
        </Button>
                {pdfurl? <a className={classes.link} href={pdfurl} >download pdf</a>:<span></span>}
                &nbsp;&nbsp;&nbsp;
                {xlurl? <a className={classes.link} href={xlurl} >download excel</a>:<span></span>}
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

                <IconButton aria-label="delete" className={classes.FloatRight} 
                      onClick={()=>{
                              delete_note(props.app,notes._id)     //* Delete function
                              .then(()=> setCount(count=>count+1));
                        }
                      }>
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="SveRoudedIcon" className={classes.FloatRight} 
                      onClick={()=>{
                        const update = {
                          title: input.title,
                          content: input.content,
                          userID: input.userID 
                        }
                          edit_note(props.app,notes._id,update)     //* Edit function  
                        }} >
                  <SaveRoundedIcon fontSize="small" />
                </IconButton>

            </Card>
            
            </div>
            ))}
        </div>)

}