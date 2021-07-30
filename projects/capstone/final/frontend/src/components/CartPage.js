import { Canvas, useFrame } from '@react-three/fiber';
import GlitchText from "./GlitchText";
import Header from "./Header";
import CameraModel from './CameraModel';
import FilmModel from './FilmModel';
import LensModel from './CameraModel';
import Terrain from './Terrain';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


const CartPage = () => {
  return (
    
    <Canvas
    colorManagement
    shadowMap
    camera={{ position: [0, 0, 60], fov: 50 }}>
    
      
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />
    
    
    <CameraModel position={[-4.2, 0, 40]} />
    <CameraModel position={[-2.2, 0, 40]} />
    <CameraModel position={[-0.2, 0, 40]} />
    <CameraModel position={[2.2, 0, 40]} />
    <CameraModel position={[4.2, 0, 40]} />


    <Terrain/>

  </Canvas>
 
  )
}

export default CartPage
;