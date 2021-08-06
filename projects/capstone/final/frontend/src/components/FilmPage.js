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
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />

    
    <CameraModel position={[2.2, 0, 40]} />

    <Terrain/>
    <Particles/>
    
    </Suspense>
      
  </Canvas>
 
  )
}

export default FilmPage
;