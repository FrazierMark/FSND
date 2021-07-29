import React, { useState, useEffect, Component } from 'react';
import Header from "./components/Header";
import './App.scss'
import { Canvas, useFrame } from '@react-three/fiber';
import CameraModel from './components/CameraModel';
import FilmModel from './components/FilmModel';
import LensModel from './components/CameraModel';
import Terrain from './components/Terrain';
import LandingPage from './components/LandingPage';


const App = () => {
  return (
    <LandingPage/>
  )
}

export default App;
