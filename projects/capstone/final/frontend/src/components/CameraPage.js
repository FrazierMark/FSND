import { Canvas } from '@react-three/fiber';
import React, { useRef, Suspense } from "react";
import CameraModel from './CameraModel';
import Terrain from './Terrain';
import {OrbitControls} from '@react-three/drei';
import BlockText from './BlockText';
import { Html } from "@react-three/drei";
import GetCameras from "./GetCameras"
import Loader from './Loader';
import { Particles } from './Particles';



function Jumbo() {
  const ref = useRef()
  return (
    // Jumbo 3D Text (CAMERAS)
    <group ref={ref}>
      <BlockText hAlign="right" position={[-10, 5, -20]} children="CAMERAS" />
    </group>
  )
}


const CameraPage = () => {
  
  return (
    
    
    <Canvas
    
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 40], fov: 50 }}>

    <Suspense fallback={<Loader />}>

    <fog attach="fog" args={['#ff6161', 10, 500]} />
    
    <Jumbo />
    
      
    <ambientLight intensity={0.5} />
    <pointLight position={[-10, 0, -10]} />

    <CameraModel position={[-17, 5, -25]} />
    
    <OrbitControls />
    <Terrain/>

    <Html position={[-25, 0, -240]} >
      <GetCameras /> 
    </Html>


    <Particles/>
    </Suspense>
  </Canvas>
  

  )
}

export default CameraPage
;