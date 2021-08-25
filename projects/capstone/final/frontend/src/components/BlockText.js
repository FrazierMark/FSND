import * as THREE from 'three'
import React, { useMemo, useRef, useLayoutEffect } from 'react'
import typefaceData from "@compai/font-recursive/data/typefaces/normal-300.json";




function BlockText({ children, vAlign = 'center', hAlign = 'center', size = 2.5, color = '#000000', ...props }) {
  const font = new THREE.FontLoader().parse(typefaceData);
  const config = useMemo(
    () => ({ font, size: 20, height: 10, curveSegments: 5, bevelEnabled: false, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
    [font]
  )
  const mesh = useRef()
  useLayoutEffect(() => {
    const size = new THREE.Vector3()
    mesh.current.geometry.computeBoundingBox()
    mesh.current.geometry.boundingBox.getSize(size)
    mesh.current.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
    mesh.current.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
  }, )
  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <textGeometry args={[children, config]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  )
}

export default BlockText