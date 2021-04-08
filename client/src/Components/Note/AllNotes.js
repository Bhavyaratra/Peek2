
import React from 'react';
import {useEffect,useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'Inline',
          minWidth: 275,
           
          boxShadow: '0 3px 5px 2px rgba(22, 21, 21, .3)',
          marginTop: 10,
          background: 'rgb(39, 39, 39)',
          color: 'white',
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
                <div className="card">
        <Card className={classes.root}>
                <CardContent className="elements" key={notes.id}>
                <Typography variant="h5" component="h2">
                    {notes.title}
                    </Typography>
                <Typography variant="body2" component="p">    
                    {notes.content}
                    </Typography>
                </CardContent>
                <Button size="small" variant="contained" color="secondary">Delete</Button>
            </Card>
            </div>
            ))}

            
            
        {/* </ul>  */}
        </div>)

}