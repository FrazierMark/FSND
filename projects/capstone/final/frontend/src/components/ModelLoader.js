import React, { Suspense, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html, useProgress } from '@react-three/drei';

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()
    return <Html center>{progress} % loaded</Html>
  }

const Hasselblad = () => {
  const gltf = useLoader(GLTFLoader, "Hasselblad-binary.glb");
  return (
  <Suspense fallback={<Loader />}>
    <primitive object={gltf.scene}
     dispose={null}
     scale={.04, .04, .04} />
  </Suspense>
  )};

export default Hasselblad