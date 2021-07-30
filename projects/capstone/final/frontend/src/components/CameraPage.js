import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useEffect, useState } from "react";
import GlitchText from "./GlitchText";
import CameraModel from './CameraModel';
import FilmModel from './FilmModel';
import LensModel from './CameraModel';
import Terrain from './Terrain';
import {OrbitControls, Html } from '@react-three/drei';
import fonts from "./fonts";
const text = "Cameras" ;


const CameraPage = () => {
  const [rotation, setRotation] = useState([0, 0, 0, 0]);
  const [opts, setOpts] = useState({
    font: "BlinkMacSystemFont",
    fontSize: 3,
    color: "#fff",
    maxWidth: 100,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: "justify",
    materialType: "MeshPhongMaterial"
  });
  return (
    
    <>
    <Canvas
    dpr={[1, 2]}
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 10], fov: 50 }}>
     <fog attach="fog" args={['#ff6161', 10, 500]} />
     
     <text
     position-x={0}
     position-y={5}
      position-z={-20}
      rotation={rotation}
      {...opts}
      text={text}
      font={fonts[opts.font]}
      anchorX="center"
      anchorY="middle"
      >
        
      {opts.materialType === "MeshPhongMaterial" ? (
        <meshPhongMaterial attach="material" color={opts.color} />
      ) : null}
      </text>
      
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />

    <CameraModel position={[-4.2, 0, 0]} />
    <CameraModel position={[-2.2, 0, 0]} />
    
    <OrbitControls />
    <Terrain/>
    
  </Canvas>
  
 </>
  )
}

export default CameraPage
;