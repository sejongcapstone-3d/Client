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
import "./Home.scss";
import Model from "../../common/components/Model";
import Arrow from "../../common/icons/arrow-white.svg";
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

  const onPointerEnterHanlder = (e) => {
    e.object.material.wireframe = true;
  };

  const onPointerLeaveHandler = (e) => {
    e.object.material.wireframe = false;
  };

  return (
    <mesh
      ref={ref}
      {...props}
      onPointerLeave={onPointerLeaveHandler}
      onPointerEnter={onPointerEnterHanlder}
      castShadow>
      <boxBufferGeometry args={[3, 3, 3]} />
      <meshPhysicalMaterial color="#4b89dc" metalness={0.6} roughness={0.4} />
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

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-title">
        <div className="home-title-1">Visit your rooms</div>
        <div className="home-title-2">Check it in 3D</div>
        <div
          className="home-title-button"
          onClick={() => {
            navigate("/map");
          }}>
          <div className="home-title-button-text">방 보기<span>로그인 없이</span></div>
          <img src={Arrow} alt="arrow" className="home-title-button-icon" />
        </div>
        <div
          className="home-title-button"
          onClick={() => {
            navigate("/user/signIn");
          }}>
          <div className="home-title-button-text">방 등록<span>로그인 / 회원가입</span></div>
          <img src={Arrow} alt="arrow" className="home-title-button-icon" />
        </div>
        
      </div>
      <Canvas
        shadows
        style={{ background: "white" }}
        camera={{ position: [4, 4, 5] }}>
        <pointLight castShadow position={[1, 5, 0]} />
        <Suspense fallback={null}>
          {/* <Model position={[2, 1, 0]} scale={[0.6, 0.6, 0.6]} path='https://3d-rooms.s3.ap-northeast-2.amazonaws.com/Sample2.json' /> */}
          <Box position={[2, 1, -1]} />
        </Suspense>
        <ambientLight intensity={1} />
        <Floor position={[0, -2, 0]} />
      </Canvas>
    </div>
  );
}

export default Home;
