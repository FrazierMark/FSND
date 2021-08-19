import React, { Suspense, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



const Lens = () => {
  const gltf = useLoader(GLTFLoader, "nikon_lens.glb");
  return (
  <Suspense fallback={null}>
    <primitive object={gltf.scene} 
    dispose={null}
    scale={.2, .2, .2} />
  </Suspense>
  )};



function LensModel(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
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
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>

      <Lens />
    </mesh>
  )
}
export default LensModel
