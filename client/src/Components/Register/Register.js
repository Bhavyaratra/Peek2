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

export default function Register(props){
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");


    async function handleClick(){
        
        try{  
          if(name!=="" && email!=="" && password!=="" &&password2!==""&& password===password2){

               const newUser = {
                    name: name,
                    email: email,
                    password: password,
                    password2: password2
                }
                const res = await props.app.currentUser.functions.register(newUser);
            
                if(res){
                    console.log(res)
                    history.push("/login")
                }
            }else{
                alert("please fill all details!")
            }
        }catch(err){
          alert("incorrect")
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
                name="name"
                id="standard-required" 
                label="Name" 
                required="true"
                onChange={(e)=>setName(e.target.value)}/>

            <TextField 
                className={classes.textfield} 
                name="email"
                type="email"
                id="standard-required" 
                label="Email" 
                onChange={(e)=>setEmail(e.target.value)}/>

            <TextField 
                type="password"
                className={classes.textfield}
                name="password" 
                id="standard-required"  
                label="Password" 
                required="true"
                onChange={(e)=>setPassword(e.target.value)}/>

            <TextField 
                type="password"
                className={classes.textfield}
                name="password2" 
                id="standard-required"  
                label="Password" 
                onChange={(e)=>setPassword2(e.target.value)}/>

            <Button 
                className={classes.loginButton}
                onClick={handleClick}>
                    Register
            </Button>
          </div>    
        </Paper>
        </div>
    )

}