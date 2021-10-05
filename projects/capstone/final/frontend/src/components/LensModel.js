import React, { Suspense, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


// Loads 3D Lens Model 
const Lens = () => {
  const gltf = useLoader(GLTFLoader, "nikon_lens.glb");
  return (
  <Suspense fallback={null}>
    <primitive object={gltf.scene} 
    dispose={null}
    scale={[.2, .2, .2]} />
  </Suspense>
  )};



function LensModel(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const [active, setActive] = useState(false);
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

      <Lens />
    </mesh>
  )
}
export default LensModel
