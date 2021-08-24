import React, { Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import Terrain from './Terrain';
import Loader from './Loader';
import { Particles } from './Particles';
import { OrbitControls } from "@react-three/drei";
import { Html } from "@react-three/drei";
import Profile from "./ProfileContent";
import Auth0ProviderWithHistory from "../auth0-provider-with-history";


const ProfilePage = () => {
  return (
    
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 60], fov: 50 }}>

    <Suspense fallback={<Loader />}>
    <OrbitControls/>
    <Particles/>
    <fog attach="fog" args={['#ff6161', 10, 500]} />
    <ambientLight intensity={0.5} />
    <pointLight position={[-10, -10, -10]} />
    
    <Html>
      <Auth0ProviderWithHistory>
      <Profile/>
      </Auth0ProviderWithHistory>
    </Html>

    <Terrain/>
    </Suspense>

  </Canvas>
 
  )
}

export default ProfilePage
;