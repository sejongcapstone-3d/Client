import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, extend, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Model from "../../common/components/Model";
import "./Room.scss";
import RoomHeader from "./RoomHeader";
import RoomSideBar from "./RoomSideBar";
import { TransformControls } from "@react-three/drei";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FurnitureSelector from "./FurnitureSelector";
import FurnitureInfo from "./FurnitureInfo";
import { useLocation } from "react-router-dom";

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
    <mesh ref={ref} {...props} castShadow>
      <boxBufferGeometry args={[2, 2, 2]} />
      <meshPhysicalMaterial color="black" wireframe />
    </mesh>
  );
};

function Room() {
  const [isLoaded, setIsLoaded] = useState(false);
  const furnitures = useSelector((state) => state.furniture.furnitures);
  const selectedFurniture = useSelector((state) => state.furniture.selectedFurniture);
  const mode = useSelector((state) => state.furniture.mode);
  const [furniture, setFurniture] = useState([]);
  const roomState = useLocation().state;
  const infoOpen = useSelector((state)=>state.furniture.furnitureInfo);
  const loadHandler = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    setFurniture(
      furnitures.map((data) => {
        return (
          <TransformControls
            onMouseDown={()=>{setIsLoaded(true)}}
            onMouseUp={()=>{setIsLoaded(false)}}
            showX={selectedFurniture.id === data.id}
            showY={selectedFurniture.id === data.id}
            showZ={selectedFurniture.id === data.id}
            enabled={selectedFurniture.id === data.id}
            mode={mode}
          >
            <Model
              loading={loadHandler}
              position={[0, 0, 0]}
              scale={[0.8, 0.8, 0.8]}
              path={data.path}
            />
          </TransformControls>
        );
      })
    );
  }, [furnitures, mode, selectedFurniture]);

  return (
    <div className="room">
      <FurnitureSelector />
      <RoomHeader />
      {infoOpen && <FurnitureInfo/>}
      <RoomSideBar />
      <Canvas shadows style={{ background: "#ececec" }} camera={{ position: [4, 4, 4] }}>
        <pointLight castShadow position={[1, 5, 0]} />
        {!isLoaded && <Orbit />}
        <Suspense fallback={<Box position={[0, 0, 0]} />}>
          <Model
            loading={loadHandler}
            position={[0, 0, 0]}
            scale={[0.8, 0.8, 0.8]}
            path={roomState.roomUrl}
          />
          {furniture}
        </Suspense>
        <ambientLight intensity={1} />
      </Canvas>
    </div>
  );
}

export default Room;
