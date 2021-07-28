import React, { useState, useEffect, Component } from 'react';
import Header from "./components/Header";
import './App.scss'

import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);
 
 
 
  return (
    <div className="App">
      <Header path />
      <Router>
        <Switch>
          {/* <Route path="/" exact component={QuestionView} /> */}
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
