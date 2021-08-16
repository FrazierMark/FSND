import React, { useState, Suspense, useRef } from "react";
import { Canvas, extend, useThree } from '@react-three/fiber';
import {  CubeTextureLoader } from "three";

import frontImg from "../images/Night Moon 1.png";
import backImg from "../images/Night Moon 2.png";
import upImg from "../images/Night Moon 5.png";
import downImg from "../images/Night Moon 6.png";
import rightImg from "../images/Night Moon 4.png";
import leftImg from "../images/Night Moon 3.png";



const SkyBox = () => {
    const { scene } = useThree();
    // scene.rotation.y = Math.PI/2.1;
    const loader = new CubeTextureLoader();
    const texture = loader.load([
      frontImg,
      backImg,
      upImg,
      downImg,
      rightImg,
      leftImg
    ]);
    scene.background = texture;
    return null;
  };

  export default SkyBox