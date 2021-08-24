import { Canvas } from '@react-three/fiber';
import React, { useRef, Suspense } from "react";
import CameraModel from './CameraModel';
import Terrain from './Terrain';
import {OrbitControls} from '@react-three/drei';
import BlockText from './BlockText';
import { Html } from "@react-three/drei";
import GetCameras from "./GetCameras"
import Loader from './Loader';
import { Particles } from './Particles';
import SkyBox from './SkyBox';
import { useAuth0 } from "@auth0/auth0-react";


function Jumbo() {
  const ref = useRef()
  return (
    <group ref={ref}>
      <BlockText hAlign="right" position={[-10, 5, -20]} children="CAMERAS" />
      {/* <BlockText hAlign="right" position={[-4, 0, 0]} children="THREE" /> */}
      {/* <BlockText hAlign="right" position={[-4, -7.5, 0]} children="FIBER" /> */}
    </group>
  )
}

const Profile = () => {
  const { user } = useAuth0();

  
  console.log(user)

  return user;
};


const CameraPage = () => {
  
  return (
    
    
    <Canvas
    
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 30], fov: 50 }}>

    <Suspense fallback={<Loader />}>

    <fog attach="fog" args={['#ff6161', 10, 500]} />
    
    <Jumbo />
    
      
    <ambientLight intensity={0.5} />
    <pointLight position={[-10, 0, -10]} />

    <CameraModel position={[-17, 5, -25]} />
    
    <OrbitControls />
    <Terrain/>
    <SkyBox />

    
    <Html position={[-18, 0, 0]} >
      <GetCameras /> 
    </Html>

    <Html>
      <Profile />
      </Html>

    <Particles/>
    </Suspense>
  </Canvas>
  

  )
}

export default CameraPage
;