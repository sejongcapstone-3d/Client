import React, { Suspense, useRef } from "react";
import * as THREE from "three";
import {
  Canvas,
  useFrame,
  extend,
  useThree,
  useLoader
} from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Model from "../../common/components/Model";
import Arrow from "../../common/icons/arrow-white.svg";
import Dragable from "../../common/components/Dragable";
extend({ OrbitControls });

const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

const Box = (props) => {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.005;
  });

  return (
    <mesh
      ref={ref}
      {...props}
      castShadow>
      <boxBufferGeometry args={[2, 2, 2]} />
      <meshPhysicalMaterial color="black" wireframe />
    </mesh>
  );
};

const Floor = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[50, 1, 100]} />
      <meshPhysicalMaterial color={"0xffffff"} />
    </mesh>
  );
};

function Room() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Canvas
        shadows
        style={{ background: "white" }}
        camera={{ position: [4, 4, 4] }}>
        <pointLight castShadow position={[1, 5, 0]} />
        <Orbit />
        <Suspense fallback={<Box position={[0, 0, 0]} />}>
          {/* <Dragable> */}
            <Model position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]} path='https://3d-rooms.s3.ap-northeast-2.amazonaws.com/Room.json' />
          {/* </Dragable> */}
        </Suspense>
        <ambientLight intensity={1} />
      </Canvas>
    </div>
  );
}

export default Room;
