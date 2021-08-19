import React, { Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import Terrain from './Terrain';
import Loader from './Loader';
import { Particles } from './Particles';
import { Html } from "@react-three/drei";
import Profile from "./ProfileContent";



const ProfilePage = () => {
  return (
    
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 60], fov: 50 }}>

    <Suspense fallback={<Loader />}>
    <Particles/>
    <fog attach="fog" args={['#ff6161', 10, 500]} />
    <ambientLight intensity={0.5} />
    <pointLight position={[-10, -10, -10]} />
    
    <Html>

    <Profile/>
    
    </Html>

    <Terrain/>
    </Suspense>

  </Canvas>
 
  )
}

export default ProfilePage
;