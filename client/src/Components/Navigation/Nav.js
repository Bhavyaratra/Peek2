import React from "react";
import Name from "./Name";
import Logo from './Logo';
import './Navbar.css';
export default function Navbar(){

    return(
    <div className="navbar">
        <Logo/>
        <Name/>
    </div>
    );
}