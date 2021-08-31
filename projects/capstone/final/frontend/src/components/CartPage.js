import GetCartInfo from './CartForm';
import { Canvas } from '@react-three/fiber';
import Terrain from './Terrain';
import { Particles } from './Particles';
import {OrbitControls} from '@react-three/drei';
import React, { Suspense } from "react";
import Loader from "./Loader"

import Auth0ProviderWithHistory from "../auth0-provider-with-history";
import { Html } from "@react-three/drei";

const CartPage = () => {

  return (
    
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 60], fov: 50 }}>
    <fog attach="fog" args={['#ff6161', 1, 600]} />
    <Html position={[-18, 0, 0]} >
    
    <Auth0ProviderWithHistory>
      <GetCartInfo />
    </Auth0ProviderWithHistory> 
    </Html>

    <Suspense fallback={<Loader />}>
    
    
      
    <ambientLight intensity={0.5} />
    <pointLight position={[-10, -10, -10]} />
    

    <Terrain/>
    <Particles/>
    <OrbitControls/>

    

  </Suspense>
  </Canvas>
 
  )
}

export default CartPage;