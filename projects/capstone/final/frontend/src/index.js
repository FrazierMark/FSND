import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Auth0Provider } from "@auth0/auth0-react";
import LandingPage from './components/LandingPage';

const rootElement = document.getElementById("root");
const customHistory = createBrowserHistory({
  // basename: config.urlBasename || ""
});
ReactDOM.render(
  <Auth0Provider
    domain="m-mark-frazier.us.auth0.com"
    clientId="DS68qv0tEXGHUqxizctdrlVJZRGEISjN"
    redirectUri='https://localhost:3000/'
  >
  
  <Router history={customHistory}>
    <Route
      component={({ history }) => {
        window.appHistory = history;
        return <App />;
      }}
    />
  </Router>
  </Auth0Provider>,
  rootElement
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
