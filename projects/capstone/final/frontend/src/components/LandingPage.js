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
      <BlockText hAlign="right" position={[-20, 5, 6]} children="Welcome" />
      {/* <BlockText hAlign="right" position={[-4, 0, 0]} children="THREE" /> */}
      {/* <BlockText hAlign="right" position={[-4, -7.5, 0]} children="FIBER" /> */}
    </group>
  )
}




const LandingPage = () => {
  
  return (
    <div>
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 50], fov: 50 }}>

    <Suspense fallback={<Loader />}>
    <fog attach="fog" args={['#ff6161', 10, 500]} />
    <Jumbo/>
    <Robotman />
    <OrbitControls />
  

    <pointLight position={[1, 11, 11]} />
    <pointLight position={[1, 7, 9]} />
    <pointLight position={[1, 4, 10]} />

    {/* <FilmModel position={[-29, 2.4, -9.1]}/> */}
    
  
        {/* <pointLight position={[-100, 0, -160]} /> */}
        
    <Particles/>
    {/* <SkyBox /> */}
    <Terrain/>
    </Suspense>
  </Canvas>

  
  </div>
  
  )
}

export default LandingPage;