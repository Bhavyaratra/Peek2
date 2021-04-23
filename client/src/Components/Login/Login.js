import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles(()=>({
    container:{
        boxSizing: 'border-box',
    },
    loginForm:{
        maxWidth: '444px',
        width: '100%',
        display: 'block',
        boxSizing: 'border-box',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '16px',
        paddingRight: '16px',
        background: '#f6f6f6'
    },
    textfields:{
        width:'100%',
        display: 'flex',
        marginTop: '64px',
        alignItems: 'center',
        flexDirection: 'column',
       
    },
    textfield:{
        marginTop: '16px',
        width:'75%',
    }
    ,
    loginButton:{
        width:'75%',
        marginTop: '26px',
        marginBottom: '16px',
        paddingLeft: '12px',
        paddingRight: '12px',
        backgroundColor: '#115293',
        color:'white',
        '&:hover':{
            backgroundColor: '#00ff99',
            color:'black'
        }
    },
    loginIcon:{
        marginTop: '16px',
        color:'#115293',
        fontSize:'55px'
    }
 
}))

export default function Login(){


    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function handleClick(){
        console.log(email)
      try{  
       const res = await fetch('/api/login',{
            method:'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "content-type": "application/json; charset=UTF-8"
            }
        });
        
            if( res.status===200){ 
          
            history.push("/")
            }
            else {
                alert("incorrect")
                console.log("incorrect")
            }
      }
      catch{
          console.log("incorrect details")
      }    
    }

    const classes = useStyles()
    return(
        <div className={classes.container}>
        <Paper elevation={2} className={classes.loginForm}>
          <div className={classes.textfields}>
            <AccountCircleIcon className={classes.loginIcon} fontSize='large'/>
            <TextField 
                className={classes.textfield} 
                name="email"
                id="standard-basic" 
                label="Email" 
                onChange={(e)=>setEmail(e.target.value)}/>

            <TextField 
                type="password"
                className={classes.textfield}
                name="password" 
                id="standard-basic" 
                label="Password" 
                onChange={(e)=>setPassword(e.target.value)}/>

            <Button 
                className={classes.loginButton}
                onClick={handleClick}>
                    login
            </Button>
          </div>    
        </Paper>
        </div>
    )

}