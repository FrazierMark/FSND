import { Canvas, extend } from '@react-three/fiber';
import React, { useRef, Suspense } from "react";
import CameraModel from './CameraModel';
import Terrain from './Terrain';
import {OrbitControls} from '@react-three/drei';
import BlockText from './BlockText';
import { Text } from "troika-three-text";
import { Html } from "@react-three/drei";
import CreateProductForm from "./CreateProductForm";
import Loader from "./Loader";
import { Auth0Provider } from "@auth0/auth0-react";


function Jumbo() {
  const ref = useRef()
  return (
    <group ref={ref}>
      <BlockText hAlign="right" position={[-22, 5, -30]} children="Create Product" />
      {/* <BlockText hAlign="right" position={[-4, 0, 0]} children="THREE" /> */}
      {/* <BlockText hAlign="right" position={[-4, -7.5, 0]} children="FIBER" /> */}
    </group>
  )
}


const CreateProduct = () => {
  
  return (
    <Canvas
    dpr={[1, 2]}
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 30], fov: 75 }}>
     <fog attach="fog" args={['#ff6161', 10, 300]} />

     <Suspense fallback={<Loader />}>
        <Jumbo />
  
      
      <Html>
      <CreateProductForm/>
      </Html>
      
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />

    <CameraModel position={[-4.2, 0, 0]} />
    
    <OrbitControls />
    <Terrain/>
    
    

    </Suspense>
    </Canvas>
  
  )
}
export default CreateProduct
;