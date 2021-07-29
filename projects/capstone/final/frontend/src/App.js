import React, { useState, useEffect, Component } from 'react';
import Header from "./components/Header";
import './App.scss'
import { Canvas, useFrame } from '@react-three/fiber';
import CameraModel from './components/CameraModel';
import FilmModel from './components/FilmModel';
import LensModel from './components/CameraModel';
import Terrain from './components/Terrain';


const App = () => {
  return (
    <>
    <Header />
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 60], fov: 50 }}>
    
      
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />

    <CameraModel position={[-2.2, 0, 40]} />
    <FilmModel position={[-0.2, 0, 40]} />
    <LensModel position={[2.2, 0, 40]} />

    <Terrain/>

  </Canvas>
  </>
  )
}

export default App;
