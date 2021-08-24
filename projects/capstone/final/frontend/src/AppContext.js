import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_SERVER_URL;

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [userData, setuserData] = useState({});
  const [submit, setSubmit] = useState(false);
  const [submitPost, setSubmitPost] = useState(false);

  // Auth0 - data
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [accessToken, setaccessToken] = useState(null);

  // Auth0 get token
  useEffect(() => {
    if (user) {
      const getAccessToken = async () => {
        const domain = "m-mark-frazier.us.auth0.com";

        try {
          const accessToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: 'read:current_user',
          });

          setaccessToken(accessToken);
        } catch (e) {
          console.log(e.message);
        }
      };
      getAccessToken();
    }
  }, [user, getAccessTokenSilently]);

  

  return (
    <AppContext.Provider
      value={{
        user: user,
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        accessToken: accessToken,
        userData: userData,
        setSubmit: setSubmit,
        submit: submit,
        submitPost: submitPost,
        setSubmitPost: setSubmitPost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}