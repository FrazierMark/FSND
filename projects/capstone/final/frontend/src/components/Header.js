import React from "react";

const Header = () => {
  
  return (
    <header>
      <div className='header-inner'>
        <div className='logo'>Grainy Days Camera Store</div>
        <nav>
        <ul>
            <li>
              <a href='/'> Cameras </a>
            </li>
            <li>
               <a href=''> Lenses </a> 
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
