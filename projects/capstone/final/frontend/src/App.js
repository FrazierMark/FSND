import React, { Component } from 'react';
import Header from "./components/Header";
import './App.scss'
import LandingPage from './components/LandingPage';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


const App = () => {
  return (
    <>
    <Header />
    <LandingPage/>
    </>
  )
}

export default App;
