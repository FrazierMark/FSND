import React, { Suspense, useRef } from "react";
import { Canvas } from '@react-three/fiber';
import FilmModel from './FilmModel';
import Terrain from './Terrain';
import Loader from './Loader';
import { Particles } from './Particles';
import { OrbitControls } from "@react-three/drei";
import BlockText from './BlockText';
import SkyBox from "./SkyBox";
import { Html } from "@react-three/drei";
import GetAllFilm from "./GetFilm";

function Jumbo() {
  const ref = useRef()
  return (
    <group ref={ref}>
      <BlockText hAlign="right" position={[-8, 4, -8]} children="FILM" />
      {/* <BlockText hAlign="right" position={[-4, 0, 0]} children="THREE" /> */}
      {/* <BlockText hAlign="right" position={[-4, -7.5, 0]} children="FIBER" /> */}
    </group>
  )
}


const FilmPage = () => {
  return (
    
    <Canvas
    
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 30], fov: 50 }}>
    <OrbitControls/>
    <fog attach="fog" args={['#ff6161', 10, 500]} />
    
    <Suspense fallback={<Loader />}>
    <ambientLight intensity={1} />
    
    
    <pointLight position={[-10, 0, -10]} />
    <FilmModel position={[-14, 4, -8]}  />


    <Html position={[-18, 0, 0]} >
      <GetAllFilm /> 
    </Html>
    <Jumbo />
    <Terrain/>
    <Particles/>
    <SkyBox />
    </Suspense>
      
  </Canvas>
 
  )
}

export default FilmPage
;