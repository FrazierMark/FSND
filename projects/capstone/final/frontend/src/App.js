import React, { Component } from 'react';
import Header from "./components/Header";
import './App.scss'
import LandingPage from './components/LandingPage';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import CamerasView from './components/CamerasView';


export default function App() {
  return (
    <>
    <Header/>
    <Switch>
      
        <Route path="/" exact component={LandingPage} />
        <Route path="/CamerasView" component={CamerasView} />
      </Switch>

    </>
  );
}
