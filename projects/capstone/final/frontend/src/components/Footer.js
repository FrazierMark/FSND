import React from "react";
import { NavLink } from 'react-router-dom';



const Footer = () => {
  
  return (
    <footer>
      <div className='footer-inner'>
        <div className='logo'>Grainy Days Camera Store</div>
        <nav>
        <ul>
            <li className='btn'>
              <a href='/CreateProduct' > Manage </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>    
    );
  };


export default Footer
