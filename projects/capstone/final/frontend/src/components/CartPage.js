import { Canvas, useFrame } from '@react-three/fiber';
import CameraModel from './CameraModel';
import FilmModel from './FilmModel';
import LensModel from './CameraModel';
import Terrain from './Terrain';
import { Particles } from './Particles';
import {OrbitControls} from '@react-three/drei';
import { Html } from "@react-three/drei";
import { Content } from "./Content";
import FormSuccess from "./Testform"
import React, { Suspense } from "react";
import Loader from "./Loader"


const CartPage = () => {
  return (
    
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 60], fov: 50 }}>

    <Suspense fallback={<Loader />}>
      
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />
    
  
    <CameraModel position={[4.2, 0, 40]} />


    <Terrain/>
    <Particles/>
    <OrbitControls/>
    <Html >
          <Content />
    </Html>

    {/* <Html>
      <FormSuccess/>
    </Html> */}
  </Suspense>
  </Canvas>
 
  )
}

export default CartPage
;