import React from "react";
import { Html, useProgress } from "@react-three/drei";

// Loading div while 3D elements are loading
export default function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
  }
