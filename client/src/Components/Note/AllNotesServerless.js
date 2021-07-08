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
import XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as autoTable from 'jspdf-autotable';
import {jsPDF} from 'jspdf';

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

    //* getallnotes0()
    useEffect(()=>{
      // console.log("getnote")
      if(props.userID){
      props.app.currentUser.functions.getallnotes0(props.userID)
      .then(result=>{
        // console.log(count)
        // console.log(props.newNote)
        // console.log(props.userID)
        // console.log(result)
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

    //*Import notes to excel and Download
    const downloadExcel=()=>{
      const fileName = 'sheet'
      const fileType = 'application/xlsx;charset=UTF-8';
      const fileExtension = '.xlsx';

      //convert ObjectId to string
      const dataString = data;
      dataString.forEach((obj)=>obj._id=obj._id.toString());

      console.log(dataString);
      const ws = XLSX.utils.json_to_sheet(dataString);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const xldata = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(xldata, fileName + fileExtension);
      
    }

    //Import notes to PDF in table format and Download
    const downloadTablePDF=()=>{
      const doc = new jsPDF();
      var col = ["Title","Contents"];
      var rows=[];
      doc.text(13, 10, 'NOTES');
      doc.setFontSize(9);
      data.forEach((obj,i)=>{
       var temp = [obj.title,obj.content];
       rows.push(temp);
      });
      doc.autoTable(col, rows,{startY: 20});
      doc.save('notes.pdf')
     }

    //*Import notes to PDF and Download
    const downloadPDF=()=>{
     const doc = new jsPDF();
     doc.text(10, 10, 'All NOTES');
     doc.setFontSize(9);
     data.forEach((obj,i)=>{
      doc.text("Title: "+obj.title + "\nContent: "+obj.content,10,20 +(i*20));
     })
     
     doc.save('notes.pdf')
    }
    

    return(<div >
      <Link style={{ textDecoration: 'none' }} to="/filedata">
        <Button className={classes.btn}>File Data</Button>
      </Link>
    
        <Button className = {classes.btn_dwnld}
                onClick={downloadExcel}>excel
        </Button>
        <Button className = {classes.btn_dwnld}
                onClick={downloadPDF}>pdf
        </Button>
    
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