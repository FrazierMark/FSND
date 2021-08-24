import React, { Suspense, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Html } from '@react-three/drei';
import GlitchText from "./GlitchText";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Auth0ProviderWithHistory from "../auth0-provider-with-history";
import CreateProductForm2 from "./CreateProductForm2";




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
        {/* <h1>
        <GlitchText>Price</GlitchText>
      </h1> */}
        
        {/* <Auth0ProviderWithHistory>
        <CreateProductForm2/>
        </Auth0ProviderWithHistory> */}
      </Html>
    
      <Model />
      
    </mesh>
    
  )
}
export default CameraModel


{/* <div className="content">
hello <br />
world
</div> */}