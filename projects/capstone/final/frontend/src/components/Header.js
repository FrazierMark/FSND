import React from "react";
import GlitchText from "./GlitchText";
import { NavLink } from 'react-router-dom';




const Header = () => {
  
  return (
    <header>
      <div className='header-inner'>
        <div className='logo'>Grainy Days Camera Store</div>
        <div className="Glitch">
      {/* <h1>
        <GlitchText>welcome</GlitchText>
      </h1> */}
      </div>
        <nav>
        <ul>
            <li>
            <NavLink to="/"> Home </NavLink> 
            </li>
            <li>
              <NavLink to="/CameraPage"> Cameras </NavLink>
            </li>
            <li>
              <NavLink to="/LensPage"> Lenses </NavLink>
            </li>
            <li>
            <NavLink to="/FilmPage" className='btn'> Film </NavLink>
            </li>
            <li className='btn'>
              <a href='/CartPage' > Cart </a>
            </li>
            <li className='btn'>
              <a href='/CheckoutPage' > Checkout </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>    
    );
  };


export default Header
