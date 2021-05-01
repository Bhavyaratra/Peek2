import React from "react";
import Logo from './Logo';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useEffect,useState} from 'react';

const useStyles = makeStyles((theme) => ({
  navbar: {
    flexGrow: 1,
    maxHeight: '8hv',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navButton: {
      color: "black",
      background: "crimson",
      
      '&:hover': {
          background: "white"
      },
      marginRight: theme.spacing(2)
  },
  appBar:{
      background: 'black'
  },
  Link:{
    textDecoration:'none',
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [user,setUser]= useState({});

  useEffect(() => {
    const intervalId = setInterval(()=>{
      let userstring = document.cookie;
      setUser(userstring);
      // console.log(userstring)
    },1000);
    return () => clearInterval(intervalId);
  });

  const RenderMenu=()=>{

    if(!user){
      return(<>

      <Link style={{ textDecoration: 'none' }} to="/login">
      <Button color="inherit" className={classes.navButton}>Login</Button>
      </Link>
      <Link style={{ textDecoration: 'none' }} to="/register">
      <Button color="inherit" className={classes.navButton}>Signup</Button>
      </Link>
        
      </>)
    }  
      else {
        return(<>
          <Link style={{ textDecoration: 'none' }} to="/logout">
          <Button color="inherit" className={classes.navButton}>Logout</Button>
          </Link>
          </>)
      }
      
  }

  return (
    <div className={classes.navbar}>
      <AppBar className={classes.appBar}position="static">
        <Toolbar>
          <Link edge="start" className={classes.menuButton} to="/">
            <Logo/>
          </Link>
          <Typography variant="h6" className={classes.title}>
            Peek 2.0
          </Typography>

         <RenderMenu/>
         
        </Toolbar>
      </AppBar>
    </div>
  );
}