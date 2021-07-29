import React, { useState, useEffect, Component } from 'react';
import Header from "./components/Header";
import './App.scss'
import { Canvas, useFrame } from '@react-three/fiber';
import CameraModel from './components/CameraModel';


import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const App = () => {
  return (
    <>
    <Header />
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [10, 0, 80], fov: 50 }}>
    
      
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />

    <CameraModel position={[-1.2, 0, 0]} />
    <CameraModel position={[1.2, 0, 0]} />
    
  </Canvas>
  </>
  )
}

export default App;
