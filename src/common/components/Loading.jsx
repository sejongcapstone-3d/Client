import React, { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, extend, useThree, useLoader } from "@react-three/fiber";

const Loading = () => {
  const Box = (props) => {
    const ref = useRef();
    useFrame((state) => {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.005;
    });

    return (
      <mesh ref={ref} {...props} castShadow>
        <boxBufferGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial color="black" wireframe />
      </mesh>
    );
  };

  return (
    <div className="home">
      <Canvas shadows style={{ background: "white" }} camera={{ position: [4, 4, 4] }}>
        <Box position={[0, 0, 0]} />
        <ambientLight intensity={1} />
      </Canvas>
    </div>
  );
};

export default Loading;
