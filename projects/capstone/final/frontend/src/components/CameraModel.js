import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import {OrbitControls, Html } from '@react-three/drei';
import GlitchText from "./GlitchText";

function CameraModel(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      <Html distanceFactor={10}>
        <h1>
        <GlitchText>Price</GlitchText>
      </h1>
        
        {/* <div class="content">
          hello <br />
          world
        </div> */}
      </Html>
    
    </mesh>
  )
}
export default CameraModel
