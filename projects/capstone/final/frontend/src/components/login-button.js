
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Login Button redirects to Auth0 to login
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
  export default LoginButton;