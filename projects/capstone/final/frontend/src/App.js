import React, { Component } from 'react';
import Header from "./components/Header";
import './App.scss'
import LandingPage from './components/LandingPage';
import Terrain from './components/Terrain';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import CameraPage from './components/CameraPage';


export default function App() {
  return (
    <>
    <Header/>
    <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/CameraPage" component={CameraPage} />
      </Switch>

    </>
  );
}
