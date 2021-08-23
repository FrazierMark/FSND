import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth0-provider-with-history';


ReactDOM.render(
  <Auth0ProviderWithHistory>
  <BrowserRouter>
    
      <App />
    
  </BrowserRouter>
  </Auth0ProviderWithHistory>,
  document.getElementById("root")
);
