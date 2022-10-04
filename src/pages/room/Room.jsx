import React, { Suspense, useRef,useState } from "react";
import * as THREE from "three";
import {
  Canvas,
  useFrame,
  extend,
  useThree,
  useLoader
} from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Model from "../../common/components/Model";
import Arrow from "../../common/icons/arrow-white.svg";
import Dragable from "../../common/components/Dragable";
import "./Room.scss";
import RoomHeader from "./RoomHeader";
import RoomSideBar from "./RoomSideBar";

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

function Room() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOrbit, setIsOrbit] = useState(true);
  const [isDragable, setIsDragable] = useState(false);
  const loadHandler = () => {
    setIsLoaded(true);
  };

  const isOrbitHandler = () => {
    setIsOrbit(true);
    setIsDragable(false);
  };
  const isDragHandler = () => {
    setIsOrbit(false);
    setIsDragable(true);
  };

  return (
    <div className="room">
      <RoomHeader/>
      <RoomSideBar orbit={isOrbitHandler} drag={isDragHandler}/>
      {!isLoaded && <div className="room-loading">Loading...</div>}
      <Canvas
        shadows
        style={{ background: "#ececec" }}
        camera={{ position: [4, 4, 4] }}>
        <pointLight castShadow position={[1, 5, 0]} />
        {isLoaded && isOrbit && <Orbit />}
        <Suspense fallback={<Box position={[0, 0, 0]} />}>
          <Dragable drag={isDragable}>
            <Model loading={loadHandler} position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]} path='https://3d-rooms.s3.ap-northeast-2.amazonaws.com/test/Room.json' />
          </Dragable>
        </Suspense>
        <ambientLight intensity={1} />
      </Canvas>
    </div>
  );
}

export default Room;
