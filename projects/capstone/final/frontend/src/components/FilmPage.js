import React, { Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import CameraModel from './CameraModel';
import FilmModel from './FilmModel';
import LensModel from './CameraModel';
import Terrain from './Terrain';
import Loader from './Loader';
import { Particles } from './Particles';
import { OrbitControls } from "@react-three/drei";


const FilmPage = () => {
  return (
    
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 60], fov: 50 }}>
    <OrbitControls/>
    <fog attach="fog" args={['#ff6161', 10, 800]} />
    
    <Suspense fallback={<Loader />}>
    <ambientLight intensity={5.5} />
    
    <pointLight position={[1, 11, 11]} />
    <pointLight position={[1, 4, 10]} />
    
    <CameraModel position={[2, 0, 20]} />
    <FilmModel position={[10, 0, 20]}  />

    <Terrain/>
    <Particles/>
    
    </Suspense>
      
  </Canvas>
 
  )
}

export default FilmPage
;