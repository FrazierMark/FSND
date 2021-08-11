import React, { Suspense, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei';
import GlitchText from "./GlitchText";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';




const Roboman = () => {
  const gltf = useLoader(GLTFLoader, "roboman.glb");
  return (
  <Suspense fallback={null}>
    <primitive object={gltf.scene} 
    dispose={null}
    scale={.01, .01, .01}
    position={[0, 0, 0]}  />
  </Suspense>
  )};


function Robotman(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    // mesh.current.rotation.y += 0.01
  })
  return (

    
    <mesh
    
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      
      <Html distanceFactor={40}>
        <h1>
        <GlitchText>Price</GlitchText>
      </h1>
        
        {/* <div class="content">
          hello <br />
          world
        </div> */}
      </Html>
      
      
      <Roboman  />
      
    </mesh>
    
  )
}
export default Robotman
