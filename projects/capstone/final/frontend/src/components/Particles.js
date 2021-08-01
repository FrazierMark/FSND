import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const Particles = ({ count = 3000 }) => {
  const ref = useRef(null);
  const positionArray = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 70;
  }

  useFrame(({ clock, mouse }) => {
    ref.current.rotation.z = -0.2 * clock.getElapsedTime();

    ref.current.rotation.x = -mouse.y * (clock.getElapsedTime() * 0.01);
    ref.current.rotation.y = mouse.x * (clock.getElapsedTime() * 0.01);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={count}
          array={positionArray}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial size={0.015} color={"#1D4ED8"} />
    </points>
  );
};
