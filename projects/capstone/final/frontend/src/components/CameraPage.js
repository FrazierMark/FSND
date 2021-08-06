import { Canvas, useLoader } from '@react-three/fiber';
import React, { useRef, useState, Suspense } from "react";
import CameraModel from './CameraModel';
import Terrain from './Terrain';
import {OrbitControls} from '@react-three/drei';
import fonts from "./fonts";
import BlockText from './BlockText';
import { Html, useProgress } from "@react-three/drei";
import GetCameras from "./GetCameras"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const text = "Cameras" ;

// const Model = () => {
//   const gltf = useLoader(GLTFLoader, "/Hasselblad-binary.glb");
//   return (
//   <Suspense fallback={null}>
//     <primitive object={gltf.scene} />
//   </Suspense>
//   )};



function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()
    return <Html center>{progress} % loaded</Html>
  }



function Jumbo() {
  const ref = useRef()
  return (
    <group ref={ref}>
      <BlockText hAlign="right" position={[-22, 5, -30]} children="CAMERA" />
      {/* <BlockText hAlign="right" position={[-4, 0, 0]} children="THREE" /> */}
      {/* <BlockText hAlign="right" position={[-4, -7.5, 0]} children="FIBER" /> */}
    </group>
  )
}


const CameraPage = () => {
  const [rotation, setRotation] = useState([0, 0, 0, 0]);
  const [opts, setOpts] = useState({
    font: "BlinkMacSystemFont",
    fontSize: 3,
    color: "#fff",
    maxWidth: 100,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: "justify",
    materialType: "MeshPhongMaterial"
  });
  return (
    
    
    <Canvas
    
    dpr={[1, 2]}
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 30], fov: 50 }}>

    <Suspense fallback={<Loader />}>
    <fog attach="fog" args={['#ff6161', 10, 500]} />

     
    <Jumbo />
    
     
     <text
     position-x={0}
     position-y={5}
      position-z={-5}
      height={10}
      width={10}
      rotation={rotation}
      {...opts}
      text={text}
      font={fonts[opts.font]}
      anchorX="center"
      anchorY="middle"
      >
        
      {opts.materialType === "MeshPhongMaterial" ? (
        <meshPhongMaterial attach="material" color={opts.color} />
      ) : null}
      </text>
      
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />

    <CameraModel position={[-4.2, 0, 0]} />
    <CameraModel position={[-2.2, 0, 0]} />
    
    <OrbitControls />
    <Terrain/>

    
    <Html position={[-20, 0, 0]}>
      <GetCameras/>
    </Html>
{/* 
    <Model />     */}
    </Suspense>
  </Canvas>
  

  )
}

export default CameraPage
;