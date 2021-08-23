import React, { Suspense, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Film = () => {
  const gltf = useLoader(GLTFLoader, "portra400.glb");
  return (
  <Suspense fallback={null}>
    <primitive object={gltf.scene} 
    dispose={null}
    scale={[.03, .03, .03]}
    position={[0, 0, 0]}  />
  </Suspense>
  )};



function FilmModel(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y += .01 
  })
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 2 : 1}
      onClick={(e) => setActive(!active)}>
      
      <Film />
    </mesh>
  )
}
export default FilmModel
