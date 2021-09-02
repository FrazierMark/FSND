import React from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";


const AuthNav = () => {
  const { isAuthenticated  } = useAuth0();

  // console.log(isAuthenticated)
  // console.log(user)

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};



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
            <Link to="/"> Home </Link> 
            </li>
            <li>
              <Link to="/CameraPage"> Cameras </Link>
            </li>
            <li>
              <Link to="/LensPage"> Lenses </Link>
            </li>
            <li>
            <Link to="/FilmPage" > Film </Link>
            </li>
            <li className='btn'>
              <a href='/CartPage' > Cart </a>
            </li>
            <li className='btn'>
              <a href='/ProfilePage' > Profile </a>
            </li>
            <li>
              <AuthNav />              
            </li>
            <li className='logbtn'>
              <a href='/CreateProduct' > Manage </a>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>    
    );
  };


export default Header
