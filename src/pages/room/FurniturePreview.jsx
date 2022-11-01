import React, { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, extend, useThree, useLoader } from "@react-three/fiber";
import Model from "../../common/components/Model";
import "./FurniturePreview.scss";

function FurniturePreivew() {
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
    <div className="furniture-preview">
      <Canvas shadows style={{ background: "#ececec" }} camera={{ position: [3, 3, 3] }}>
        <ambientLight intensity={1} />
        <pointLight castShadow position={[1, 5, 0]} />
        <Suspense fallback={<Box position={[0, 0, 0]} />}>
          <Model
            position={[0, 0, 0]}
            scale={[2.5, 2.5, 2.5]}
            path="https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/bed/0.json"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default FurniturePreivew;
