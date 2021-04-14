import React from "react";
import Name from "./Name";
import Logo from './Logo';
import './Navbar.css';
import Button from '@material-ui/core/Button';
import {Link}  from 'react-router-dom';



export default function Navbar(){
    
    return(
    <div className="navbar">
        <Link to="/">
        <Logo/>
        </Link>
        <Name/>
        <div className="nav-buttons">
        <Link to="/login">
            <Button className='nav-button'>Login</Button>
        </Link>
        </div>
    </div>
    );
}