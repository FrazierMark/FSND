import { Canvas } from '@react-three/fiber';
import Terrain from './Terrain';
import { Particles } from './Particles';
import {OrbitControls} from '@react-three/drei';
import React, { Suspense } from "react";
import Loader from "./Loader"

const CartPage = () => {
  return (
    
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 60], fov: 50 }}>
    <fog attach="fog" args={['#ff6161', 1, 600]} />

    <Suspense fallback={<Loader />}>
      
    <ambientLight intensity={0.5} />
    <pointLight position={[-10, -10, -10]} />
    


    <Terrain/>
    <Particles/>
    <OrbitControls/>
    {/* <Html >
          <Content />
    </Html> */}

  </Suspense>
  </Canvas>
 
  )
}

export default CartPage;