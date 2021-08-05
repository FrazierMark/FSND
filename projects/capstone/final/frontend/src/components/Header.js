import React from "react";
import GlitchText from "./GlitchText";
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});



const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button
    class='logbtn'
  onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
    class='logbtn'
    onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
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
            <li class='btn'>
              <a href='/CartPage' > Cart </a>
            </li>
            <li class='btn'>
              <a href='/CheckoutPage' > Checkout </a>
            </li>
            <li>
              <LoginButton/>              
            </li>
            <li>
              <LogoutButton/>              
            </li>
          </ul>
        </nav>
      </div>
    </header>    
    );
  };


export default Header
