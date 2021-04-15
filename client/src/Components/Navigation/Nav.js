import React from "react";
import Logo from './Logo';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
      }
  },
  appBar:{
      background: 'black'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

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
          <Link to="/login">
          <Button color="inherit" className={classes.navButton}>Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}