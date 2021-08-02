import { Canvas, extend } from '@react-three/fiber';
import * as THREE from 'three'
import React, { useRef, useEffect, useMemo, useLayoutEffect, useState, Suspense } from "react";
import CameraModel from './CameraModel';
import Terrain from './Terrain';
import {OrbitControls} from '@react-three/drei';
import fonts from "./fonts";
import BlockText from './BlockText';
import { Text } from "troika-three-text";
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Html } from "@react-three/drei";
import CreateCamera from "./CreateProductForm"

extend({ Text });

const Create = () => (
    <Form>
        <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' />
        </Form.Field>
        <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
    </Form>
)



const text = "Cameras orem ipsum dolor sit amet, consectetur adipiscing elit, sed do e orem ipsum dolor sit amet, consectetur adipiscing elit, sed do e" ;


function Jumbo() {
  const ref = useRef()
  return (
    <group ref={ref}>
      <BlockText hAlign="right" position={[-22, 5, -30]} children="Create Product" />
      {/* <BlockText hAlign="right" position={[-4, 0, 0]} children="THREE" /> */}
      {/* <BlockText hAlign="right" position={[-4, -7.5, 0]} children="FIBER" /> */}
    </group>
  )
}


const CreateProduct = () => {
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
    camera={{ position: [0, 0, 30], fov: 75 }}>
     <fog attach="fog" args={['#ff6161', 10, 300]} />

     <Suspense fallback={null}>
        <Jumbo />
    </Suspense>
     
    
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

      <Html>
      <CreateCamera/>
    </Html>



      
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />

    <CameraModel position={[-4.2, 0, 0]} />
    <CameraModel position={[-2.2, 0, 0]} />
    
    <OrbitControls />
    <Terrain/>
    
    

    
  </Canvas>
  
  )
}

export default CreateProduct
;