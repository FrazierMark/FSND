import { Canvas, extend } from '@react-three/fiber';
import React, { useState, Suspense, useRef } from "react";
import Header from "./Header";
import CameraModel from './CameraModel';
import FilmModel from './FilmModel';
import LensModel from './CameraModel';
import Terrain from './Terrain';
import { Text } from "troika-three-text";
import {OrbitControls } from '@react-three/drei';
import Loader from './Loader';
import BlockText from './BlockText';
import { Particles } from './Particles';
import Robotman from './Robotman';

function Jumbo() {
  const ref = useRef()
  return (
    <group ref={ref}>
      <BlockText hAlign="right" position={[-20, 5, -10]} children="Welcome" />
      {/* <BlockText hAlign="right" position={[-4, 0, 0]} children="THREE" /> */}
      {/* <BlockText hAlign="right" position={[-4, -7.5, 0]} children="FIBER" /> */}
    </group>
  )
}
function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-10, -10, -9]}
      lookAt={[-13, -17, -13]}
      penumbra={1}
      castShadow
    />
  );
}

// function FillLight({ brightness, color }) {
//   return (
//     <rectAreaLight
//       width={3}
//       height={3}
//       intensity={brightness}
//       color={color}
//       position={[2, 1, 4]}
//       lookAt={[-13, -17, -13]}
//       penumbra={2}
//       castShadow
//     />
//   );
// }

extend({ Text });

const text =
  "Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit" ;

const LandingPage = () => {
  const [rotation, setRotation] = useState([0, 0, 0, 0]);
  const [opts, setOpts] = useState({
    font: "Philosopher",
    fontSize: 5,
    color: "#99ccff",
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: "justify",
    materialType: "MeshPhongMaterial"
  });

  return (
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 50], fov: 50 }}>

    <Suspense fallback={<Loader />}>
    <fog attach="fog" args={['#ff6161', 10, 500]} />
    <Jumbo/>
    <Robotman />
    <OrbitControls />
    
    <KeyLight />
    <ambientLight intensity={40.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

    <pointLight position={[1, 10, 10]} />
    
    
    <FilmModel position={[-29, 2.4, -9.1]}/>
    
    
    
         {/* <text
          position-z={30}
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
        </text>  */}


        <pointLight position={[-100, 0, -160]} />
        <pointLight position={[0, 0, -170]} />
        <pointLight position={[100, 0, -160]} />
    <Particles/>
    <Terrain/>
    </Suspense>
  </Canvas>
  
  
  )
}

export default LandingPage;