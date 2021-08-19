import React from "react";
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="btn"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};


const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="logbtn"
      onClick={() => logout()}
    >
      Log Out
    </button>
  );
};

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

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
            <NavLink to="/"> Home </NavLink> 
            </li>
            <li>
              <NavLink to="/CameraPage"> Cameras </NavLink>
            </li>
            <li>
              <NavLink to="/LensPage"> Lenses </NavLink>
            </li>
            <li>
            <NavLink to="/FilmPage" > Film </NavLink>
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
            
          </ul>
        </nav>
      </div>
    </header>    
    );
  };


export default Header
