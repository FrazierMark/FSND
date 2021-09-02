import GetCartInfo from './CartForm';
import { Canvas } from '@react-three/fiber';
import Terrain from './Terrain';
import { Particles } from './Particles';
import {OrbitControls} from '@react-three/drei';
import React, { Suspense, useRef } from "react";
import Loader from "./Loader"
import CartModel from './CartModel';
import BlockText from './BlockText';

import Auth0ProviderWithHistory from "../auth0-provider-with-history";
import { Html } from "@react-three/drei";

const CartPage = () => {


  function Jumbo() {
    const ref = useRef()
    return (
      <group ref={ref}>
        <BlockText hAlign="right" position={[-10, 16, -8]} children="Need" />
        <BlockText hAlign="right" position={[-4, 10, -8]} children="TO" /> */}
        <BlockText hAlign="right" position={[-4, 4, -8]} children="FIX" />
      </group>
    )
  }

  return (
    
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 60], fov: 50 }}>
    <fog attach="fog" args={['#ff6161', 1, 600]} />
    
    <Html position={[-13, -2, 0]} >
    <Auth0ProviderWithHistory>
      <GetCartInfo />
    </Auth0ProviderWithHistory> 
    </Html>

    <Suspense fallback={<Loader />}>
    
    <CartModel position={[-16, 0, -10]} />
      
    <ambientLight intensity={0.5} />
    <pointLight position={[-10, -10, -10]} />
    

    <Terrain/>
    <Particles/>
    <OrbitControls/>

  
    <Jumbo />

    </Suspense>
    </Canvas>
 
  )
}

export default CartPage;