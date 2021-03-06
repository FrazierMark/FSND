import React, { Suspense, useRef } from "react";
import { Canvas } from '@react-three/fiber';
import Terrain from './Terrain';
import {OrbitControls } from '@react-three/drei';
import Loader from './Loader';
import BlockText from './BlockText';
import { Particles } from './Particles';
import Robotman from './Robotman';



function Jumbo() {
  const ref = useRef()
  return (
    <group ref={ref}>
      <BlockText hAlign="right" position={[-16, 5, 6]} children="Welcome" />
    </group>
  )
}




const LandingPage = () => {
  
  return (
    <div>
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 40], fov: 50 }}>

    <Suspense fallback={<Loader />}>
    <fog attach="fog" args={['#ff6161', 10, 500]} />
    <Jumbo/>
    <Robotman />
    <OrbitControls />
  

    <pointLight position={[1, 11, 11]} />
    <pointLight position={[1, 7, 9]} />
    <pointLight position={[1, 4, 10]} />

  
    <Particles/>
    {/* <SkyBox /> */}
    <Terrain/>
    </Suspense>
  </Canvas>

  
  </div>
  
  )
}

export default LandingPage;