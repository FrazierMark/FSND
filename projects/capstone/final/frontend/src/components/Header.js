import React from "react";
import GlitchText from "./GlitchText";
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

const Header = () => {
  
  return (
    <header>
      <div className='header-inner'>
        <div className='logo'>Grainy Days Camera Store</div>
        <div className="Glitch">
      <h1>
        <GlitchText>Welcome</GlitchText>
      </h1>
      </div>
        <nav>
        <ul>
            <li>
              <NavLink to="/CameraPage"> Cameras </NavLink>
            </li>
            <li>
            <NavLink to="/"> Home </NavLink> 
            </li>
            <li>
              <a href='/'> Film </a>
            </li>
            <li className='btn'>
              <a href='/' > Cart </a>
            </li>
            <li className='btn'>
              <a href='/' > Checkout </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>    
    );
  };


export default Header
