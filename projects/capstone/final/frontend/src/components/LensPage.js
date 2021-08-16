import React, { Suspense, useRef, useState } from "react";
import { Canvas } from '@react-three/fiber';
import LensModel from './LensModel';
import Terrain from './Terrain';
import Loader from './Loader';
import { Particles } from './Particles';
import { OrbitControls } from "@react-three/drei";
import SkyBox from "./SkyBox";

import BlockText from './BlockText';

function Jumbo() {
  const ref = useRef()
  return (
    <group ref={ref}>
      <BlockText hAlign="right" position={[-10, 5, -8]} children="Lenses" />
      {/* <BlockText hAlign="right" position={[-4, 0, 0]} children="THREE" /> */}
      {/* <BlockText hAlign="right" position={[-4, -7.5, 0]} children="FIBER" /> */}
    </group>
  )
}

const LensPage = () => {
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

    <SkyBox />
    <Jumbo />
    <Particles/>
    </Suspense>
  </Canvas>
 
  )
}

export default LensPage;