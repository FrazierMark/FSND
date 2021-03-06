import React, { Suspense, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Html } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';




const Model = () => {
  const gltf = useLoader(GLTFLoader, "Hasselblad-binary.glb");
  return (
  <Suspense fallback={null}>
    <primitive object={gltf.scene} 
    dispose={null}
    scale={[.02, .02, .02]}  />
  </Suspense>
  )};


function CameraModel(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y += 0.01
  })
  return (

    
    <mesh
    
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(e) => setActive(!active)}>

      
      
      <Html distanceFactor={70}>
        
      </Html>
    
      <Model />
      
    </mesh>
    
  )
}
export default CameraModel

