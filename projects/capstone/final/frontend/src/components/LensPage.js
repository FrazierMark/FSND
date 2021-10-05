import React, { Suspense, useRef } from "react";
import { Canvas } from '@react-three/fiber';
import LensModel from './LensModel';
import Terrain from './Terrain';
import Loader from './Loader';
import { Particles } from './Particles';
import { OrbitControls, Text } from "@react-three/drei";
import GetLenses from "./GetLenses";
import { Html } from "@react-three/drei";
import BlockText from './BlockText';



function Jumbo() {
  const ref = useRef()
  return (
    <group ref={ref}>
      <BlockText hAlign="right" position={[-10, 5, -8]} children="Lenses" />
    </group>
  )
}

const LensPage = () => {

  const opts = {
    font: "Comfortaa",
    fontSize: 9,
    color: "#000000",
    maxWidth: 260,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: "justify"
  };



  return (
    
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 30], fov: 50 }}>
    <OrbitControls />
    <fog attach="fog" args={['#ff6161', 10, 500]} />
    
    <Suspense fallback={<Loader />}>
      
    <ambientLight intensity={.5} />
    <pointLight position={[-5, 0, 5]} />
    <pointLight position={[-10, -5, -5]} />
    
    <LensModel position={[-15, 0, -8]} />
    <Terrain/>


    <Html position={[-10, 0, -100]} >
      <GetLenses /> 
        </Html>


    <Jumbo />
    <Particles/>
    </Suspense>
  </Canvas>
 
  )
}

export default LensPage;