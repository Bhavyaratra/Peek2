
import React from 'react';
import {useEffect,useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';




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
        FloatRight:{
          float:'right',
          color: 'crimson', 
        },
        title: {
            fontSize: 14,
          },
          pos: {
            marginBottom: 12,
          },
      }));
      const classes = useStyles();
    return(<div >
        <h1>ALL NOTES</h1>
        {/* <ul className="list"> */}
            
            {data.map((notes)=>(
                <div className="card" key={notes._id} >
        <Card className={classes.root}>
                <CardContent className="elements" >
                <Typography variant="h5" component="h2">
                    {notes.title}
                    </Typography>
                <Typography variant="body2" component="p">    
                    {notes.content}
                    </Typography>
                </CardContent>
                <IconButton aria-label="delete" className={classes.FloatRight} >
                  <DeleteIcon fontSize="small" />
                </IconButton>
            </Card>
            </div>
            ))}

            
            
        {/* </ul>  */}
        </div>)

}