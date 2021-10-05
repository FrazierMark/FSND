
import React, { useRef } from "react";
import { useFrame } from '@react-three/fiber';


const GROUND_HEIGHT = -30;


// Grid-like moving terrain
function Terrain() {
    const terrain = useRef();
  
    useFrame(() => {
      terrain.current.position.z += 0.4;
    });
    // Returns a mesh at GROUND_HEIGHT below the player. Scaled to 5000, 5000 with 128 segments.
    // X Rotation is -Math.PI / 2 which is 90 degrees in radians.
    return (
      <mesh
        visible
        position={[0, GROUND_HEIGHT, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        ref={terrain}
      >
        <planeBufferGeometry attach="geometry" args={[10000, 10000, 428, 428]} />
        <meshStandardMaterial
          attach="material"
          color="#FFC0CB"
          roughness={5}
          metalness={0}
          wireframe
        />
      </mesh>
    );
  }
  export default Terrain
  